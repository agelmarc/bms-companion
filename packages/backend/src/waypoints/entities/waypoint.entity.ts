import { Player } from "src/player/entities/player.entity";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dimension, WaypointType } from "types";

@Entity("waypoint")
export class Waypoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.uuid)
  byPlayer: string;

  @Column()
  type: WaypointType;

  @Column()
  dimension: Dimension;

  @Column({ default: false })
  published: boolean;

  @Column()
  description: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  z: number;

  constructor(partial: Partial<Waypoint> = {}) {
    Object.assign(this, partial);
  }
}
