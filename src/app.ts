import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ContextI } from "./interfaces/RequestHandler";
import { meResolver } from "./resolvers/user/me";
import { GetUsersResolver } from "./resolvers/user/getUsers";
import { LoginResolver } from "./resolvers/user/login";
import { RegisterResolver } from "./resolvers/user/register";
import cookieParser from 'cookie-parser'
import cors from 'cors'




export async function startserver() {
  const app = express();
  app.use(cookieParser());
  app.use(cors({
     origin: "*",
     credentials: true
  }))

  
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [GetUsersResolver, LoginResolver, RegisterResolver, meResolver],
    }),
    context: ({ req, res }): ContextI => ({ req, res })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  
  return app;
}
