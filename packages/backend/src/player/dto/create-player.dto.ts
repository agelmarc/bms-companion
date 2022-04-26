import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
