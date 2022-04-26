import s from "./Player.module.scss";

import type { Player as PlayerType } from "types";

const Player: React.FC<{ player: PlayerType }> = ({ player }) => {
  return (
    <div className={s.player}>
      <img
        className={s.avatar}
        src={`https://crafatar.com/avatars/${player.uuid}?size=20`}
        alt=""
      />
      <span className={s.name}>{player.username}</span>
    </div>
  );
};

export default Player;
