import { Module, OnModuleInit } from "@nestjs/common";

import { GsController } from "./gs.controller";
import { GsService } from "./gs.service";

@Module({
  providers: [GsService],
  controllers: [GsController],
})
export class GsModule {}
