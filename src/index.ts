import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import formatArgumentValidationError, { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";
import session from "express-session";
import cors from "cors";
import { RegisterResolver } from "./modules/user/register";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/login";
import { MeResolver } from "./modules/user/me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      ConfirmUserResolver
    ],
    authChecker: ({ context: { req } }) => {
      if (!req.session!.userId) {
        return false;
      }
      return true;
    }
  });
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError as any,
    context: ({ req }: any) => ({ req })
  });
  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost 4000/graphql");
  });
};

main();
