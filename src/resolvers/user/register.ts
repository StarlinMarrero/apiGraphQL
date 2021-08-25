import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/user";
import { UserInput } from "../../validations/userValidation";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("data") { name, email, password }: UserInput) {
    console.log(name, email, password);

    const newUser = await User.create({
      name,
      email,
      password,
    }).save();

    return newUser;
  }
}
