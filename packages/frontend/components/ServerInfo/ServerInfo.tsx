import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import s from "./ServerInfo.module.scss";
import { useServerStatus } from "@lib/hooks/fetching";

import type { ServerStatus } from "types";

const ServerInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { data, isLoading, isError } = useServerStatus();
  const [serverStatus, setServerStatus] = useState<ServerStatus>();

  useEffect(() => {
    if (isLoading || isError || !data) return;
    setServerStatus(data);
  }, [isLoading, isError, data]);

  // Copy Logic
  const timeout = useRef<any>();
  const handleCopy = () => {
    if (copied && timeout.current) {
      clearTimeout(timeout.current);
    } else {
      setCopied(true);
    }
    timeout.current = setTimeout(() => setCopied(false), 1300);
    navigator.clipboard.writeText(ip);
  };

  // Rendering
  const {
    ip = "bms.luanos.de",
    status = "offline",
    lastBackup,
  } = serverStatus ?? {};
  return (
    <div className="flexColumn" style={{ height: "45px" }}>
      <div className={s.ipWrapper}>
        <span className={s.ip} onClick={handleCopy}>
          {ip}
        </span>
        <div className={classNames("tag", s.copied, { [s.active]: copied })}>
          kopiert
        </div>
      </div>
      <div className={s.infoWrapper}>
        <span
          className={classNames(
            s.reachable,
            status == "online" ? s.online : s.offline
          )}
        >
          {status}
        </span>
        {lastBackup && (
          <>
            <div className="textSeperator" />
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/public/backups/BMS-${lastBackup}.zip`}
            >
              <span>Letztes Backup: </span>
              <span style={{ fontWeight: "600" }}>
                {new Date(lastBackup * 1000).toLocaleString("de", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerInfo;
