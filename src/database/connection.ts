import { createConnection } from "typeorm";
import config from "../config";

export const conectionDB = async () => {
  //@ts-ignore
  await createConnection(config.db.front).then(() => {
    console.log("database connected");
  });
};
