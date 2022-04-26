import { createTileLayerComponent } from "@react-leaflet/core";
import L from "leaflet";

import type { Coords, TileLayerOptions } from "leaflet";
import type { LayerGroupProps } from "react-leaflet";

class MinecraftLayer extends L.TileLayer {
  constructor(
    private readonly basePath: string,
    urlTemplate: string,
    options?: TileLayerOptions
  ) {
    super(urlTemplate, options);
  }
  getTileUrl({ x, y, z }: Coords) {
    const path = `${process.env.NEXT_PUBLIC_API_URL}/${this.basePath}`;
    const pathExt = "png";

    let url = path;
    const zoom = z;
    if (x < 0 || x >= Math.pow(2, zoom) || x < 0 || x >= Math.pow(2, zoom)) {
      url += "/blank";
    } else if (zoom === 0) {
      url += "/base";
    } else {
      for (let z = zoom - 1; z >= 0; --z) {
        const X = Math.floor(x / Math.pow(2, z)) % 2;
        const Y = Math.floor(y / Math.pow(2, z)) % 2;
        url += "/" + (X + 2 * Y);
      }
    }
    url = url + "." + pathExt;
    return url;
  }
}

const createMinecraftLayer = (
  basePath: string,
  props: LayerGroupProps,
  context: any
) => {
  const instance = new MinecraftLayer(basePath, "", {
    ...props,
    noWrap: true,
    tileSize: 384,
    bounds: [
      [0, 0],
      [-384, 384],
    ],
  });
  return { instance, context };
};

const updateMinecraftLayer = () => {};

const createMinecraftLayerComponent = (basePath: string) =>
  createTileLayerComponent(
    (props, context) => createMinecraftLayer(basePath, props, context),
    updateMinecraftLayer
  );

const OverworldLayer = createMinecraftLayerComponent("public/overworld");
const NetherLayer = createMinecraftLayerComponent("public/nether");
const EndLayer = createMinecraftLayerComponent("public/end");

export { OverworldLayer, NetherLayer, EndLayer };
