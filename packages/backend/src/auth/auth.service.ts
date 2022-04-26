import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PlayerService } from "src/player/player.service";

@Injectable()
export class AuthService {
  constructor(
    private playerService: PlayerService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const player = await this.playerService.findOne(username);
    if (player && player.password === password) {
      const { password, ...result } = player;
      return result;
    }
    return null;
  }

  async login(player: any) {
    const payload = { username: player.username, sub: player.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
