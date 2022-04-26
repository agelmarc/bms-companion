import classNames from "classnames";

import Player from "./Player";
import s from "./Player.module.scss";
import { useOnlinePlayers } from "@lib/hooks/fetching";

const PlayerDisplay: React.FC = () => {
  const { data, isError } = useOnlinePlayers();
  if (isError || !data) return null;
  const sorted = data.sort((player1, player2) =>
    player1.username.localeCompare(player2.username)
  );
  return (
    <div className={s.playerDisplay}>
      {sorted.length ? (
        sorted
          .slice(0, 11)
          .map((player) => <Player player={player} key={player.uuid} />)
      ) : (
        <p>Niemand da</p>
      )}
      {sorted.length > 11 && (
        <div className={s.ellipsis}>
          <span title={sorted.length - 11 + " Weitere Spieler"}>
            &bull;&bull;&bull;
            <div className={classNames(s.playerOverflow, s.playerDisplay)}>
              {sorted.slice(11).map((player) => (
                <Player player={player} key={player.uuid} />
              ))}
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default PlayerDisplay;
