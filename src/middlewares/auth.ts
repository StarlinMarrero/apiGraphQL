import { MiddlewareFn } from "type-graphql";
import { NextFunction } from "express";
import { ContextI } from "../interfaces/RequestHandler";
import jwt from 'jsonwebtoken'

export const isAuthenticated: MiddlewareFn<ContextI> = async ({ context }, next: NextFunction) => {


    const tokenCookies = context.req.cookies["auth"];

    if (!tokenCookies) {
        return context.res.json("not authenticated")
    }

    const resultToken = jwt.verify(tokenCookies, "auth");

    console.log(resultToken);
    
    context.res.locals.userLogin = resultToken;

    console.log('Cookies: ', tokenCookies);

    return next();

}
