import { WaypointType } from "types";

const WAYPOINT_TYPE_DISPLAY: Record<WaypointType, string> = {
  BAUWERK_O: "Bauwerk (Öffentlich)",
  BAUWERK_P: "Bauwerk (Privat)",
  FARM_O: "Farm (Öffentlich)",
  FARM_P: "Farm (Privat)",
  PORTAL_O: "Portal (Öffentlich)",
  PORTAL_P: "Portal (Privat)",
  NATURAL: "Naturgebiet",
  OTHER_O: "Öffentlich",
  OTHER_P: "Privat",
};

const WAYPOINT_TYPE_ICON_COLOR: Record<
  WaypointType,
  { color: string; icon: string }
> = {
  OTHER_O: { color: "#ffffff", icon: "other-icon.png" },
  OTHER_P: { color: "#ffffff", icon: "other-icon.png" },
  BAUWERK_O: { color: "#ffffff", icon: "bauwerk-icon.png" },
  BAUWERK_P: { color: "#ffffff", icon: "bauwerk-icon.png" },
  FARM_O: { color: "#ffffff", icon: "farm-icon.png" },
  FARM_P: { color: "#ffffff", icon: "farm-icon.png" },
  PORTAL_O: { color: "#ffffff", icon: "portal-icon.png" },
  PORTAL_P: { color: "#ffffff", icon: "portal-icon.png" },
  NATURAL: { color: "#ffffff", icon: "natural-icon.png" },
};

export { WAYPOINT_TYPE_DISPLAY, WAYPOINT_TYPE_ICON_COLOR };
