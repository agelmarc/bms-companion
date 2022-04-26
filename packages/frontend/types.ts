export enum FormType {
  Default,
  Mapclick,
}

export interface Event {
  start: Date;
  title: string;
  description?: string;
}

export interface ServerStatus {
  ip: string;
  status: "online" | "offline";
  lastBackup?: number;
}

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface DimensionConfig {
  maxZoom: number;
  lastRender: number;
  center: Point;
}

export type MapConfig = {
  [Dimension.Overworld]: DimensionConfig;
  [Dimension.Nether]: DimensionConfig;
  [Dimension.End]: DimensionConfig;
};

//! SYNC WITH API (Dimension @ types.ts)
export enum Dimension {
  Overworld = "OVERWORLD",
  Nether = "NETHER",
  End = "END",
}
//! SYNC WITH API (WaypointType @ types.ts)
export enum WaypointType {
  BAUWERK_O = "BAUWERK_O",
  BAUWERK_P = "BAUWERK_P",
  FARM_P = "FARM_P",
  FARM_O = "FARM_O",
  PORTAL_P = "PORTAL_P",
  PORTAL_O = "PORTAL_O",
  NATURAL = "NATURAL",
  OTHER_P = "OTHER_P",
  OTHER_O = "OTHER_O",
}

//! SYNC WITH API (Waypoint.entity.ts)
export interface Waypoint {
  id: number;
  published: boolean;
  dimension: Dimension;
  description: string;
  type: WaypointType;
  x: number;
  y: number;
  z: number;
  byPlayer: Player;
}
//! SYNC WITH API (create-waypoint.dto.ts)
export interface CreateWaypointDto {
  publish?: boolean;
  dimension: Dimension;
  description: string;
  type: WaypointType;
  x: number;
  y: number;
  z: number;
}

export type Player = {
  uuid: string;
  username: string;
};
