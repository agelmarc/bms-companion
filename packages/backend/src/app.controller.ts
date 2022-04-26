import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { Public } from "./auth/public.decorator";
import { PlayerService } from "./player/player.service";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private playerService: PlayerService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get("me")
  async profile(@Request() req) {
    return this.playerService.findOne(null, req.user.uuid);
  }
}
