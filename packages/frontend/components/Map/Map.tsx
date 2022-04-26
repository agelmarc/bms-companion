import { CRS, Icon, LeafletMouseEvent, Map as MapClass, popup } from "leaflet";
import { useMemo, useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";

import { OverworldLayer, NetherLayer, EndLayer } from "./Layer";
import Waypoint from "./Waypoint";
import s from "./Waypoint.module.scss";
import { useActiveWorld } from "@lib/activeWorld";
import usePlayerWaypoints from "@lib/hooks/waypoints";
import { latLngToWorldCoords, worldCoordsToLatLng } from "@utils/mapCoords";
import { WAYPOINT_TYPE_ICON_COLOR } from "const";
import { Dimension, MapConfig, Point } from "types";

const addWaypointHtml = (x: number, z: number, dimenison: Dimension) => {
  return `<a class="leaflet-create-waypoint-link link" href="/waypoints/?x=${x}&z=${z}&dim=${dimenison}&type=mapclick">Wegpunkt erstellen</a>`;
};

const Map: React.FC<{ config: MapConfig }> = ({ config }) => {
  const active = useActiveWorld();
  const [worldCoords, setWorldCoords] = useState<Point>(config[active].center);
  const mapRef = useRef<MapClass>();
  const createWaypointPopup = useMemo(() => popup(), []);
  const [isMounted, setIsMounted] = useState(false);
  const { data, isError, error } = usePlayerWaypoints(true);
  // Reset Map to original Center
  const mapCenter = useMemo(
    () => worldCoordsToLatLng(config[active].center, config[active].maxZoom),
    [active, config]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMounted) return;

    // Necessary for the AddWaypoint popup
    map.closePopup();
    map.options.maxZoom = config[active].maxZoom;

    // Event Handlers
    const updateWorldCoords = (e: LeafletMouseEvent) => {
      setWorldCoords(latLngToWorldCoords(e.latlng, config[active].maxZoom));
    };
    map.on("mousemove", updateWorldCoords);

    const openAddWaypointPopup = (e: LeafletMouseEvent) => {
      const { x, z } = latLngToWorldCoords(e.latlng, config[active].maxZoom);
      createWaypointPopup
        .setLatLng(e.latlng)
        .setContent(addWaypointHtml(x, z, active))
        .openOn(map);
    };
    map.on("click", openAddWaypointPopup);

    // Reset To Mapcenter on Map change
    map.flyTo(mapCenter, 5, { animate: false });

    return () => {
      map.off("mousemove", updateWorldCoords);
      map.off("click", openAddWaypointPopup);
    };
  }, [active, isMounted, mapCenter, createWaypointPopup, config]);
  const waypoints = useMemo(() => {
    return data?.filter((waypoint) => waypoint.dimension == active);
  }, [active, data]);

  if (isError || !data) return <p>failed: {JSON.stringify(error)}</p>;

  return (
    <div>
      <div className="px-2 absolute z-10 bottom-0 bg-blue-dark-0 p-1 flex text-sm opacity-90 items-center">
        <span className="text-xs mr-1 font-light">X</span>
        <span className="font-bold">{worldCoords.x}</span>
        <div className="w-px h-4 inline-block bg-blue-dark-2 mx-1" />
        <span className="text-xs mr-1">Z</span>
        <span className="font-bold">{worldCoords.z}</span>
      </div>
      <div className="px-2 absolute z-10 bottom-0 bg-blue-dark-0 p-1 text-sm opacity-90 right-0">
        <span>
          Stand:&nbsp;
          <span className="font-bold">
            {new Date(config[active].lastRender * 1000).toLocaleString("de", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>
      </div>
      <MapContainer
        maxZoom={config[active].maxZoom}
        center={mapCenter}
        zoom={5}
        minZoom={0}
        className="h-screen bg-inherit z-0"
        attributionControl={false}
        whenCreated={(m) => {
          mapRef.current = m;
          setIsMounted(true);
        }}
        crs={CRS.Simple}
      >
        {active == Dimension.Overworld ? (
          <OverworldLayer />
        ) : active == Dimension.Nether ? (
          <NetherLayer />
        ) : active == Dimension.End ? (
          <EndLayer />
        ) : null}
        {waypoints?.map((waypoint) => (
          <Marker
            key={waypoint.id}
            position={worldCoordsToLatLng(waypoint, config[active].maxZoom)}
            icon={
              new Icon({
                iconSize: [32, 32],
                className: "",
                iconUrl: WAYPOINT_TYPE_ICON_COLOR[waypoint.type].icon,
              })
            }
          >
            <Popup className={s.popup}>
              <Waypoint wp={waypoint} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
