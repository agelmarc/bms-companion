export interface ServerStatus {
  ip: string;
  status: "online" | "offline";
  lastBackup: Date;
}

export enum Dimension {
  Overworld = "OVERWORLD",
  Nether = "NETHER",
  End = "END",
}

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
