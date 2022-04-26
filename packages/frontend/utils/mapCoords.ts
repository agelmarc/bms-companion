import { LatLngLiteral } from "leaflet";

import type { Point } from "types";

const latLngToWorldCoords = (
  latlng: LatLngLiteral,
  maxZoom: number,
  y = 64
) => {
  let { lat, lng } = latlng;
  lat = -lat / 384;
  lng = lng / 384;
  const perPixel = 1.0 / (384 * Math.pow(2, maxZoom));

  lat -= 0.5;
  lng -= 0.5 - 1.0 / Math.pow(2, maxZoom + 1);

  const point: Point = {
    x: Math.floor((lng - 2 * lat) / (24 * perPixel)),
    y: y,
    z: Math.floor((lng + 2 * lat) / (24 * perPixel)),
  };

  point.x += 256 - y;
  point.z -= 256 - y;
  return point;
};

const worldCoordsToLatLng = (coords: Point, maxZoom: number) => {
  const { x, z } = coords;
  let { y } = coords;
  if (y == -1337) y = 64;
  const perPixel = 1.0 / (384 * Math.pow(2, maxZoom));

  let lng = 0.5 - 1.0 / Math.pow(2, maxZoom + 1);
  let lat = 0.5;

  lng += 12 * x * perPixel;
  lat -= 6 * x * perPixel;

  lng += 12 * z * perPixel;
  lat += 6 * z * perPixel;

  lat += 12 * (256 - y) * perPixel;
  lng += 12 * perPixel;

  lat *= -384;
  lng *= 384;
  return { lat, lng } as LatLngLiteral;
};

export { latLngToWorldCoords, worldCoordsToLatLng };
