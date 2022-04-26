import s from "./Event.module.scss";

import type { Event as EventType } from "types";

const Event: React.FC<{ event: EventType }> = ({ event }) => {
  return (
    <div className={s.event}>
      <div className={s.calendarDate}>
        <span className={s.day}>
          {event.start.toLocaleDateString("de", {
            day: "2-digit",
          })}
        </span>
        <span className={s.month}>
          {event.start.toLocaleDateString("de", {
            month: "short",
          })}
        </span>
      </div>
      <div>
        <p>
          <strong>{event.title}</strong>
          <span className="text-gray-400">
            {` · ${event.start.toLocaleTimeString("de", {
              minute: "2-digit",
              hour: "2-digit",
            })}`}
          </span>
        </p>
        <p className={s.description}>{event?.description}</p>
      </div>
    </div>
  );
};

export default Event;
