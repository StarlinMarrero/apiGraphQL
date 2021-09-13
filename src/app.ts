
import "reflect-metadata";
import {ApolloServer} from 'apollo-server-express';
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ContextI } from "./interfaces/RequestHandler";
import { meResolver } from "./resolvers/user/me";
import { GetUsersResolver } from "./resolvers/user/getUsers";
import { LoginResolver } from "./resolvers/user/login";
import { RegisterResolver } from "./resolvers/user/register";
import cookieParser from "cookie-parser";
import cors from "cors";
import { LogOut } from "./resolvers/user/logout";
import { Ping } from "./resolvers/test/ping";
import { SampleResolver } from "./resolvers/test/pong";
// import { ApolloServer } from "apollo-server";

export async function startserver() {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({
      resolvers: [
        GetUsersResolver,
        LoginResolver,
        RegisterResolver,
        meResolver,
        LogOut,
        Ping,
        SampleResolver
      ],
      
    }),
    context: ({ req, res }): ContextI => ({ req, res }),  
    

  });

  await apolloServer.start();
  // apolloServer.applyMiddleware({
  //   app,
  //   cors:
  //  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      allowedHeaders: "Access-Control-Allow-Origin",
      credentials: true,
      origin: (_, next) => {
        next(null, true);
      },
    },
    path: "*",
    
  });





  return app;
}
