import { HttpService } from "@nestjs/axios";
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from "@nestjs/common";
import { Interval, SchedulerRegistry } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { firstValueFrom } from "rxjs";
import { Repository } from "typeorm";

import { Player } from "./entities/player.entity";

@Injectable()
export class PlayerService implements OnModuleInit {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  onModuleInit() {
    if (process.env.PLAYER_NAME_UPDATE_INTERVAL) {
      const updatePlayernamesInterval = setInterval(
        () => this.updateUsernames(),
        parseInt(process.env.PLAYER_NAME_UPDATE_INTERVAL)
      );

      // initial
      this.updateUsernames();

      this.schedulerRegistry.addInterval(
        "update-playernames",
        updatePlayernamesInterval
      );
      Logger.log(
        `Playername Update Interval initialized @ ${
          parseInt(process.env.PLAYER_NAME_UPDATE_INTERVAL) / 1000
        } s`,
        "cron-init"
      );
    } else {
      Logger.warn(
        "Playername Update Interval could not be initialized",
        "cron-init"
      );
    }
  }

  async findAll() {
    return await this.playerRepository.find();
  }
  async findOne(username: string, uuid?: string) {
    if (uuid) return this.playerRepository.findOne(uuid);
    return this.playerRepository.findOne({ username: username });
  }
  async create(uuid: string, password: string) {
    const player = await this.playerRepository.findOne(uuid);
    if (player) {
      throw new HttpException(
        { message: "User already exists" },
        HttpStatus.CONFLICT
      );
    }
    const newPlayer = new Player();

    const username = await this.findUsername(uuid);
    if (!username) {
      throw new HttpException(
        {
          message: "Uuid is not associated to a minecraft account",
        },
        HttpStatus.NOT_FOUND
      );
    }

    newPlayer.uuid = uuid;
    newPlayer.username = username;
    newPlayer.password = password;

    const savedPlayer = await this.playerRepository.save(newPlayer);
    return savedPlayer;
  }

  async updateUsernames() {
    Logger.log("Starting Playername Update", "playername-update");
    const allPlayers = await this.playerRepository.find();
    await Promise.all(
      allPlayers.map(async (player) => {
        const username = await this.findUsername(player.uuid);
        if (!username || username == player.username) return;
        Logger.log(
          `[${player.uuid}] ${player.username} -> ${username}`,
          "playername-update"
        );
        player.username = username;
        await this.playerRepository.save(player);
      })
    ).finally(() => {
      Logger.debug("Finished Playername Update", "playername-update");
    });
  }

  private async findUsername(uuid: string): Promise<string> {
    return await firstValueFrom(
      this.httpService.get(`https://api.mojang.com/user/profiles/${uuid}/names`)
    )
      .then((res) => {
        if (res.status != 200) {
          return;
        }
        const username = res.data[res.data.length - 1].name;
        return username;
      })
      .catch(() => {
        return;
      });
  }
}
