import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ContextI } from "./interfaces/RequestHandler";

export async function startserver() {
  const app = express();

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }): ContextI => ({ req, res })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  return app;
}
