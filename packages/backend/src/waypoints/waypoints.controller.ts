import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { Public } from "src/auth/public.decorator";

import { CreateWaypointDto } from "./dto/create-waypoint.dto";
import { Waypoint } from "./entities/waypoint.entity";
import { WaypointsService } from "./waypoints.service";

@Controller("waypoints")
export class WaypointsController {
  constructor(private readonly waypointsService: WaypointsService) {}
  @Public()
  @Get()
  async findAll() {
    return this.waypointsService.findAll();
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id") id: Waypoint["id"], @Request() req) {
    const { uuid } = req.user;
    const waypoints = await this.waypointsService.findAllByUser(uuid);

    if (!waypoints.some((wp) => wp.id == id)) {
      throw new UnauthorizedException();
    }

    const affected = await this.waypointsService.delete(id);
    if (affected == 0) {
      throw new HttpException(
        `Waypoint ${id} could not be deleted`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post()
  async create(@Request() req, @Body() createDto: CreateWaypointDto) {
    const id = req.user.uuid;
    const waypoint = await this.waypointsService.create(id, createDto);
    return waypoint;
  }
}
