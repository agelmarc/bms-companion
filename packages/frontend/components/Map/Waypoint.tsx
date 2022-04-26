import s from "./Waypoint.module.scss";
import { WAYPOINT_TYPE_DISPLAY, WAYPOINT_TYPE_ICON_COLOR } from "const";
import { Waypoint } from "types";

const Waypoint: React.FC<{ wp: Waypoint }> = ({ wp }) => {
  return (
    <div
      className={s.waypointInner}
      style={{ background: WAYPOINT_TYPE_ICON_COLOR[wp.type].color }}
    >
      <p className={s.name}>{wp.description}</p>
      <div className={s.subheading}>
        <div>{WAYPOINT_TYPE_DISPLAY[wp.type]}</div>
        {wp.y != -1337 && (
          <>
            <div>&bull;</div>
            <div className="coordinates">
              <div className="x">X {wp.x}</div>
              <div className="y">Y {wp.y}</div>
              <div className="z">Z {wp.z}</div>
            </div>
          </>
        )}
      </div>
      {wp.published && (
        <p className={s.publisher}>(von {wp?.byPlayer.username})</p>
      )}
    </div>
  );
};

export default Waypoint;
