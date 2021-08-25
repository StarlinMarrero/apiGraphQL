import { createConnection } from "typeorm";
import path from "path";

export const conectionDB = async () => {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Admin",
    database: "testGraphQL",
    entities: [path.join(__dirname, "../entities/**")],
    synchronize: true,
  }).then(() => {
    console.log("database connected");
  });
};
