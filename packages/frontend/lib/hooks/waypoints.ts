import { useCallback } from "react";

import useFetch from "./fetching";
import fetcher from "@lib/fetch";
import { usePlayer } from "@lib/player";
import { CreateWaypointDto, Waypoint } from "types";

const usePlayerWaypoints = (otherPublic = false) => {
  const { uuid } = usePlayer();
  const fetchResult = useFetch<Waypoint[]>(
    uuid ? `player/${uuid}/waypoints?display=${otherPublic}` : null
  );
  const { mutate } = fetchResult;

  const addWaypoint = useCallback(
    async (createDto: CreateWaypointDto) => {
      await fetcher(`waypoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createDto),
      });
      mutate();
    },
    [mutate]
  );

  const deleteWaypoint = useCallback(
    async (waypointId: number) => {
      await fetcher(`waypoints/${waypointId}`, {
        method: "DELETE",
      });
      mutate();
    },
    [mutate]
  );

  return {
    ...fetchResult,
    addWaypoint,
    deleteWaypoint,
  };
};

export default usePlayerWaypoints;
