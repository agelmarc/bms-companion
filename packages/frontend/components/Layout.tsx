import classNames from "classnames";

import Navbar from "./common/Navbar";
import { useIsLoading } from "@lib/player";

const LINKS = [
  { href: "/", label: "Karte" },
  { href: "/rules", label: "Regeln" },
  //{ href: "/leaderboards", label: "Leaderboards" },
  { href: "/waypoints", label: "Wegpunkte" },
];

const Layout: React.FC<{ type?: any }> = ({ children, type = "LOGIN" }) => {
  const isLoading = useIsLoading();
  if (isLoading) return <div>loading</div>;
  return (
    <div className="layout">
      <Navbar links={LINKS} type={type} />
      <div
        className={classNames("main", {
          "mx-auto": type == "LOGIN",
        })}
      >
        {children}
      </div>
    </div>
  );
};

const MapLayout: React.FC = ({ children }) => {
  return <Layout type="WORLD_SELECT">{children}</Layout>;
};
export { MapLayout, Layout };
