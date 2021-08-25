import { MiddlewareFn } from "type-graphql";
import { NextFunction } from "express";
import { ContextI } from "../interfaces/RequestHandler";
import jwt from 'jsonwebtoken'

export const isAuthenticated: MiddlewareFn<ContextI> = async ({ context }, next: NextFunction) => {


    const token = context.req.headers["authorization"];

    if (!token) {
        return context.res.json("not authenticated")
    }

    const resultToken = jwt.verify(token, "test");

    console.log(resultToken);
    
    

    // const headers = context.req.headers.authorization;

    // const token = headers?.split(" ", 2)[1];

    // if(!token) return context.res.json({isAuthenticated: false})

    // const token_decoded = tokenServiceInstance.verify(token);

    // if(typeof token_decoded == "string") return context.res.json({isAuthenticated: false})

    return next();

}
