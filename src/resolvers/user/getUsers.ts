import { Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/user";
import { isAuthenticated } from "../../middlewares/auth";

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [User])
  async getUsers() {
    console.log("Users");

    return await User.find();
  }
}
