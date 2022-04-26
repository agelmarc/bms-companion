import { exec } from "child_process";

import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { status } from "minecraft-server-util";
import { StatusResponse } from "minecraft-server-util/dist/model/StatusResponse";
import getLastBackup from "src/util/getLastBackup";
import { ServerStatus } from "types";

@Injectable()
export class GsService implements OnModuleInit {
  private readonly host: string;

  private lastBackup: Date;
  private serverStatus: ServerStatus;
  private onlinePlayers: { username: string; uuid: string }[];

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {
    this.host = process.env.MC_SERVER_HOSTNAME;
  }

  onModuleInit() {
    this.lastBackup = getLastBackup();
    if (process.env.MC_SERVER_RENDER_INTERVAL) {
      const renderWorldInterval = setInterval(
        () => this.renderWorld(),
        parseInt(process.env.MC_SERVER_RENDER_INTERVAL)
      );
      this.schedulerRegistry.addInterval("render-world", renderWorldInterval);
      Logger.log(
        `World Render Interval initialized @ ${
          parseInt(process.env.MC_SERVER_RENDER_INTERVAL) / 1000
        } s`,
        "cron-init"
      );
    } else {
      Logger.warn(
        "World Render Interval could not be initialized",
        "cron-init"
      );
    }
    if (process.env.MC_SERVER_POLL_INTERVAL) {
      const serverStatusInterval = setInterval(
        () => this.pollServerStatus(),
        parseInt(process.env.MC_SERVER_POLL_INTERVAL)
      );

      this.schedulerRegistry.addInterval(
        "poll-server-status",
        serverStatusInterval
      );
      Logger.log(
        `Server Status Interval initialized @ ${
          parseInt(process.env.MC_SERVER_POLL_INTERVAL) / 1000
        } s`,
        "cron-init"
      );
    } else {
      Logger.warn(
        "Server Status Interval could not be initialized",
        "cron-init"
      );
    }

    if (process.env.MC_SERVER_BACKUP_INTERVAL) {
      const createBackupInterval = setInterval(
        () => this.createBackup(),
        parseInt(process.env.MC_SERVER_BACKUP_INTERVAL)
      );

      this.schedulerRegistry.addInterval("create-backup", createBackupInterval);
      Logger.log(
        `Backup Interval initialized @ ${
          parseInt(process.env.MC_SERVER_BACKUP_INTERVAL) / 1000
        } s`,
        "cron-init"
      );
    } else {
      Logger.warn("Backup Interval could not be initialized", "cron-init");
    }
  }

  async _getServerStatus(): Promise<[string | null] | [null, StatusResponse]> {
    return status(this.host, {
      port: 25565,
      enableSRV: false,
      timeout: 500,
      protocolVersion: 47,
    })
      .then<[null, StatusResponse]>((res) => [null, res])
      .catch((error) => [error, null]);
  }

  async pollServerStatus() {
    Logger.debug("Server Status Poll", "Poll");
    const [err, statusResponse] = await this._getServerStatus();
    const { lastBackup, host } = this;
    this.onlinePlayers = (statusResponse?.samplePlayers ?? []).map(
      ({ id, name }) => ({
        uuid: id,
        username: name,
      })
    );

    this.serverStatus = {
      ip: host,
      status: err || !statusResponse ? "offline" : "online",
      lastBackup: lastBackup,
    };
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getPlayers() {
    return this.onlinePlayers;
  }

  async renderWorld() {
    return new Promise<void>((resolve, reject) => {
      Logger.log("Beginning World Render", "render-world");
      exec(process.env.RENDER_SCRIPT, (err, stdout, stderr) => {
        Logger.log(stdout, "world-render");
        if (err) reject(err);
        resolve();
      });
    })
      .catch((error) => Logger.warn(error, "render-world"))
      .finally(() => Logger.log("Finished World Render", "render-world"));
  }

  async createBackup() {
    Logger.log("Creating World Backup", "create-backup");
    return new Promise((resolve, reject) => {
      exec(process.env.BACKUP_SCRIPT, { env: process.env }, (err, stdout) => {
        if (err) reject(err);
        this.lastBackup = new Date();
        resolve(stdout);
      });
    }).finally(() =>
      Logger.log("Finished creating World Backup", "create-backup")
    );
  }
}
