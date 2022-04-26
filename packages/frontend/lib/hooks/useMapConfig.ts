import { useMemo } from "react";

import useFetch from "./fetching";
import { Dimension, MapConfig } from "types";

const useMapConfig = () => {
  const { data } = useFetch("gs/renderconfig");
  const cfg = useMemo(() => {
    if (!data) return undefined;
    const config: any = {};
    const oCfg = data.tilesets.find((tset: any) => tset.name == "overworld");
    if (oCfg) {
      const overworld = {
        maxZoom: oCfg.maxZoom,
        lastRender: oCfg.last_rendertime,
        center: {
          x: oCfg.center[0],
          y: oCfg.center[1],
          z: oCfg.center[2],
        },
      };
      config[Dimension.Overworld] = overworld;
    }

    const nCfg = data.tilesets.find((tset: any) => tset.name == "nether");
    if (nCfg) {
      const nether = {
        maxZoom: nCfg.maxZoom,
        lastRender: nCfg.last_rendertime,
        center: {
          x: nCfg.center[0],
          y: nCfg.center[1],
          z: nCfg.center[2],
        },
      };
      config[Dimension.Nether] = nether;
    }

    const eCfg = data.tilesets.find((tset: any) => tset.name == "end");
    if (eCfg) {
      const end = {
        maxZoom: eCfg.maxZoom,
        lastRender: eCfg.last_rendertime,
        center: {
          x: eCfg.center[0],
          y: eCfg.center[1],
          z: eCfg.center[2],
        },
      };
      config[Dimension.End] = end;
    }
    return config;
  }, [data]);

  return cfg as MapConfig | undefined;
};
export default useMapConfig;
