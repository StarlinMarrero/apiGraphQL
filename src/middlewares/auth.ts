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
    
    context.res.locals.userLogin = resultToken;


    return next();

}
