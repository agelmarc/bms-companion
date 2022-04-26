import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Player } from "src/player/entities/player.entity";

import { Waypoint } from "./entities/waypoint.entity";
import { WaypointsController } from "./waypoints.controller";
import { WaypointsService } from "./waypoints.service";

@Module({
  imports: [TypeOrmModule.forFeature([Waypoint, Player])],
  providers: [WaypointsService],
  controllers: [WaypointsController],
  exports: [WaypointsService],
})
export class WaypointsModule {}
