import { Exclude } from "class-transformer";
import { Waypoint } from "src/waypoints/entities/waypoint.entity";
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

@Entity("player")
export class Player {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Waypoint, (waypoint) => waypoint.byPlayer, { cascade: true })
  waypoints: Waypoint[];
}
