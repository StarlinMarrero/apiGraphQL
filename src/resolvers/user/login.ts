import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user";
import { ContextI } from "../../interfaces/RequestHandler";
import jwt from "jsonwebtoken";

@Resolver()
export class LoginResolver {
  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: ContextI
  ) {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      // return context.res.json("invalid user");
      return "email not found";
    }

    const checkPassword = await userExist.compare(password);

    if (!checkPassword) {
      return "password invalid";
    }

    const token = jwt.sign({ id: userExist.id, name: userExist.name }, "test", {
      expiresIn: 36000,
    });
    console.log(token);

    // context.res.json(token);

    return token;
  }
}
