import dynamic from "next/dynamic";

import useMapConfig from "@lib/hooks/useMapConfig";

const Map = dynamic(
  async () => {
    return await import("./Map");
  },
  { ssr: false }
);

const MapContainer: React.FC = () => {
  const config = useMapConfig();
  if (!config) return <p>Karte wurde noch nicht gerendert</p>;
  console.log(config);
  return (
    <div>
      <Map config={config} />
    </div>
  );
};

export default MapContainer;
