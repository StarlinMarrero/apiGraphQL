import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ContextI } from "../../interfaces/RequestHandler";
import config from '../../config'




@Resolver()
export class LogOut{

    @Query(()=> Boolean)
    async LogOut(
        @Ctx() {res}: ContextI
    ){

        res.clearCookie(config.cookie.secret || "", { path: '/' });

        return true
    }


}