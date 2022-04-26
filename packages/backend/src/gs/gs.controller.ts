import { readFileSync } from "fs";

import { Controller, Get, Post } from "@nestjs/common";
import { Public } from "src/auth/public.decorator";

import { GsService } from "./gs.service";

@Controller("gs")
export class GsController {
  constructor(private readonly mcService: GsService) {}

  @Get("status")
  async getServerInfo() {
    return await this.mcService.getServerStatus();
  }

  @Get("onlineplayers")
  async getOnlinePlayers() {
    return await this.mcService.getPlayers();
  }

  @Public()
  @Get("renderconfig")
  async getRenderConfig() {
    // Ich schäme mich hierfür.
    const contents = readFileSync("data/render/overviewerConfig.js", "utf-8");
    const cfg = eval(`(function(){${contents}return overviewerConfig;})()`);
    return cfg;
  }
}
