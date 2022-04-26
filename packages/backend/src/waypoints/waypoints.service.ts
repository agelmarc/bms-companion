import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Player } from "src/player/entities/player.entity";
import { Repository } from "typeorm";
import { Dimension } from "types";

import { CreateWaypointDto } from "./dto/create-waypoint.dto";
import { Waypoint } from "./entities/waypoint.entity";

@Injectable()
export class WaypointsService {
  constructor(
    @InjectRepository(Waypoint)
    private readonly waypointRepository: Repository<Waypoint>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) {}

  async findAll() {
    return await this.waypointRepository.find({ where: { published: true } });
  }

  async findAllByUser(id, display = false) {
    return await this.waypointRepository.find(
      display
        ? {
            relations: ["byPlayer"],
            where: [{ published: true }, { byPlayer: id }],
          }
        : {
            where: { byPlayer: id },
          }
    );
  }
  async delete(id: number) {
    const deleteResult = await this.waypointRepository.delete(id);
    return deleteResult.affected ?? 0;
  }
  async create(
    id: string,
    { publish, description, dimension, type, x, y, z }: CreateWaypointDto
  ) {
    const waypoint = new Waypoint({
      published: publish,
      description,
      dimension,
      type,
      x,
      y,
      z,
    });

    const byPlayer = await this.playerRepository.findOne(id, {
      relations: ["waypoints"],
    });

    if (!byPlayer) {
      throw new HttpException(
        {
          message: "This UUID is not associated to a registered Player",
        },
        HttpStatus.NOT_FOUND
      );
    }
    byPlayer.waypoints.push(waypoint);
    this.playerRepository.save(byPlayer);
    return waypoint;
  }
}
