import Router from "next/router";
import { useSWRConfig } from "swr";

import { usePlayer } from "@lib/player";

const Profile: React.FC = () => {
  const player = usePlayer();
  const { mutate } = useSWRConfig();
  const onLogout = () => {
    window.localStorage.removeItem("jwt");
    mutate("me").then(() => {
      Router.push("/login");
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0",
        fontSize: "var(--text-size-xxs)",
      }}
    >
      <p>{player?.username}</p>
      <button className="filled" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};
export default Profile;
