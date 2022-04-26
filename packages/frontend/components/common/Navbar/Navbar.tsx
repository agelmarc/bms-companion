import classNames from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";

import s from "./Navbar.module.scss";
import PlayerDisplay from "@components/PlayerDisplay";
import Profile from "@components/Profile";
import ServerInfo from "@components/ServerInfo";
import Triblock from "@components/Triblock";

interface Link {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: Link[];
  type?: "LOGIN" | "WORLD_SELECT";
}

const Navbar: React.FC<NavbarProps> = ({ links, type = "LOGIN" }) => {
  const { asPath } = useRouter();
  return (
    <div className={s.sidebar}>
      <ServerInfo />
      <nav className={s.mainnav}>
        {links?.map((l) => (
          <NextLink href={l.href} key={l.href}>
            <a
              className={classNames(s.navlink, {
                [s.active]: asPath == l.href,
              })}
            >
              {l.label}
            </a>
          </NextLink>
        ))}
      </nav>
      <div>
        <p className={s.subheading}>Aktuell auf dem Server:</p>
        <PlayerDisplay />
      </div>
      {type == "WORLD_SELECT" && <Triblock />}
      <div className={s.profile}>
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
