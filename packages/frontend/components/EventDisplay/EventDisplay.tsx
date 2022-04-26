import Event from "./Event";

import type { Event as EventType } from "types";

const EventDisplay: React.FC<{ events: EventType[] }> = ({ events }) => {
  const currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0);
  return (
    <div className="flexColumn" style={{ gap: "1rem" }}>
      {events.map((event) => {
        if (currentTime.getTime() <= event.start.getTime()) {
          return <Event key={`${event.start}-${event.title}`} event={event} />;
        }
      })}
    </div>
  );
};

export default EventDisplay;
