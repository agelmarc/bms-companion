import classNames from "classnames";
import { useState } from "react";

import s from "./WaypointTable.module.scss";
import { WAYPOINT_TYPE_DISPLAY } from "const";
import { Waypoint } from "types";

interface WaypointDisplayProps {
  waypoint: Waypoint;
  onDelete?: () => any;
}

const WaypointDisplay: React.FC<WaypointDisplayProps> = ({
  waypoint,
  onDelete,
}) => {
  const [confirm, setConfirm] = useState(false);
  const handleClick = () => {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 2000);
      return;
    }
    onDelete?.();
  };
  return (
    <tr className="bg-blue-dark-1">
      <td className={s.name}>{waypoint.description}</td>
      <td>{WAYPOINT_TYPE_DISPLAY[waypoint.type]}</td>
      <td>{waypoint.dimension[0]}</td>
      {waypoint.y != -1337 ? (
        <>
          <td>
            <div className="x flex justify-between gap-2">
              X <span>{waypoint.x}</span>
            </div>
          </td>
          <td>
            <div className="y flex justify-between gap-2">
              Y <span>{waypoint.y}</span>
            </div>
          </td>
          <td>
            <div className="z flex justify-between gap-2">
              Z <span>{waypoint.z}</span>
            </div>
          </td>
        </>
      ) : (
        <>
          <td />
          <td />
          <td />
        </>
      )}
      <td className={s.sichtbarkeit}>
        {waypoint.published ? (
          <div className={s.jeder}>Jeder</div>
        ) : (
          <div className={s.ich}>Nur Ich</div>
        )}
      </td>
      <td>
        <button
          onClick={handleClick}
          className={classNames(s.del, confirm ? s.confirm : "")}
        >
          {confirm ? "Löschen" : "×"}
        </button>
      </td>
    </tr>
  );
};
export default WaypointDisplay;
