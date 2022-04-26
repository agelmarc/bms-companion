import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Dimension, WaypointType } from "types";

export class CreateWaypointDto {
  @IsOptional()
  @IsBoolean()
  publish?: boolean;

  @IsNotEmpty()
  description: string;

  @IsEnum(Dimension)
  dimension: Dimension;

  @IsEnum(WaypointType)
  type: WaypointType;

  @IsNotEmpty()
  x: number;

  @IsNotEmpty()
  y: number;

  @IsNotEmpty()
  z: number;
}
