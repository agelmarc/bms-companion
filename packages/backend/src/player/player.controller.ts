import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { Public } from "src/auth/public.decorator";
import { WaypointsService } from "src/waypoints/waypoints.service";

import { CreatePlayerDto } from "./dto/create-player.dto";
import { PlayerService } from "./player.service";

@Controller("player")
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly waypointsService: WaypointsService
  ) {}

  @Get(":id/waypoints")
  async findWaypoints(
    @Request() req,
    @Param("id", ParseUUIDPipe) id: string,
    @Query("display", new DefaultValuePipe(false), ParseBoolPipe)
    display
  ) {
    if (id !== req.user.uuid) {
      throw new UnauthorizedException();
    }
    return this.waypointsService.findAllByUser(id, display);
  }

  @Post()
  async create(@Body() createDto: CreatePlayerDto) {
    return this.playerService.create(createDto.uuid, createDto.password);
  }

  @Get()
  async findAll() {
    return this.playerService.findAll();
  }
}
