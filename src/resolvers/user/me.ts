import { Args, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/user";
import { ContextI } from "../../interfaces/RequestHandler";
import { isAuthenticated } from "../../middlewares/auth";

@Resolver()
export class meResolver {
  @Query(() => User)
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() context: ContextI) {
    const userData = context.res.locals.userLogin;
    
    return userData;
  }
}
