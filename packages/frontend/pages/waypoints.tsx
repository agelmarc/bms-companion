import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Layout } from "@components/Layout";
import { WaypointDisplay, WaypointForm } from "@components/waypoints";
import s from "@components/waypoints/WaypointTable.module.scss";
import usePlayerWaypoints from "@lib/hooks/waypoints";
import { CreateWaypointDto, Dimension, FormType, WaypointType } from "types";

const Waypoints: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>(FormType.Default);
  const [createWaypointInitialValues, setCreateWaypointInitialValues] =
    useState<CreateWaypointDto>();
  const { data, isError, error, deleteWaypoint, addWaypoint } =
    usePlayerWaypoints();
  const router = useRouter();
  const onSubmit = (values: CreateWaypointDto) => {
    setFormOpen(false);
    addWaypoint(values);
  };
  useEffect(() => {
    if (!router.isReady) return;
    const { x, z, dim, type: typeQuery } = router.query;
    const type = Array.isArray(typeQuery) ? typeQuery[0] : typeQuery;

    if (type !== "mapclick" || !x || !z || !dim) return;
    setFormType(FormType.Mapclick);
    setFormOpen(true);
    setCreateWaypointInitialValues({
      description: "",
      x: parseInt(Array.isArray(x) ? x[0] : x),
      y: -1337,
      z: parseInt(Array.isArray(z) ? z[0] : z),
      dimension: (Array.isArray(dim) ? dim[0] : dim) as Dimension,
      publish: false,
      type: WaypointType.BAUWERK_P,
    });
  }, [router, router.isReady]);

  if (isError || !data) return <p>failed: {JSON.stringify(error)}</p>;
  return (
    <div className="contentWrapper flexColumn items-center">
      <p onClick={() => setFormOpen((o) => !o)} className="link">
        + &nbsp; Wegpunkt hinzufügen
      </p>
      <WaypointForm
        type={formType}
        open={formOpen}
        onSubmit={onSubmit}
        initialValues={createWaypointInitialValues}
      />
      <table className={s.table}>
        <colgroup>
          <col span={1} style={{ width: "33%" }} />
          <col span={1} />
          <col span={4} />
          <col span={1} />
          <col span={1} style={{ width: "2rem" }} />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Typ</th>
            <th colSpan={4}>Koordinaten</th>
            <th>Sichtbarkeit</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((waypoint) => (
            <WaypointDisplay
              key={waypoint.id}
              waypoint={waypoint}
              onDelete={() => deleteWaypoint(waypoint.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Waypoints.Layout = Layout;

export default Waypoints;
