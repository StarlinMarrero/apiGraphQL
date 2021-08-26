import { MiddlewareFn } from "type-graphql";
import { NextFunction } from "express";
import { ContextI } from "../interfaces/RequestHandler";
import jwt from 'jsonwebtoken'
import config from "../config";

export const isAuthenticated: MiddlewareFn<ContextI> = async ({ context }, next: NextFunction) => {
    const secret: string = config.cookie.secret || ""

    const tokenCookies = context.req.cookies[secret];

    if (!tokenCookies) {
        return context.res.json("not authenticated")
    }

    const resultToken = jwt.verify(tokenCookies, secret);

    console.log(resultToken);
    
    context.res.locals.userLogin = resultToken;

    console.log('Cookies: ', tokenCookies);

    return next();

}
