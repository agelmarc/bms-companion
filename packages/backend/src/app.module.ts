import { join } from "path";

import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { GsModule } from "./gs/gs.module";
import { PlayerModule } from "./player/player.module";
import { WaypointsModule } from "./waypoints/waypoints.module";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./data/db.sq3",
      autoLoadEntities: true,
      synchronize: true,
    }),

    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: ".env" }),
    PlayerModule,
    GsModule,
    WaypointsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
