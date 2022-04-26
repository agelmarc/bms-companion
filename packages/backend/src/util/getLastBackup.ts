import { readdirSync } from "fs";

const getLastBackup = () => {
  const files = readdirSync("public/backups");

  const dates = files
    .map((file) => file.slice(0, -7))
    .map((dateStr) => new Date(dateStr))
    .sort((date1, date2) => date1.getTime() - date2.getTime());

  return dates[dates.length - 1];
};

export default getLastBackup;
