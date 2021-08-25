import { startserver } from "./app";
import { conectionDB } from "./database/connection";

async function main() {
  const app = await startserver();

  conectionDB();

  app.listen(4000, () => {
    console.log("server on running on port 4000");
  });
}

main();
