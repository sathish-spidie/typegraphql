import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "shaj",
    password: "007S@thesh",
    database: "typegraphql-test",
    dropSchema: drop,
    synchronize: drop,
    entities: [__dirname + "/../entity/**/*.*"]
  });
};
