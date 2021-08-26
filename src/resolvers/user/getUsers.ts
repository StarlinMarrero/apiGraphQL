import { Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/user";
import { isAuthenticated } from "../../middlewares/auth";

@Resolver()
export class GetUsersResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [User])
  async getUsers() {
  

    return await User.find();
  }
}
