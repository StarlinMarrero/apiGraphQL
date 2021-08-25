import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/user";
import { ContextI } from "../interfaces/RequestHandler";
import { isAuthenticated } from "../middlewares/auth";
import { UserInput } from "../validations/userValidation";
import jwt from 'jsonwebtoken'

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

  @UseMiddleware(isAuthenticated)
  @Query(() => [User])
  async getUsers() {
    console.log("Users");

    return await User.find();
  }

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

    const checkPassword = userExist.compare(password);

    if (!checkPassword) {
      return "password invalid";
    }


    const token = jwt.sign({id: userExist.id, name: userExist.name}, "test", {
      expiresIn: 36000
    })
    console.log(token);
    
    // context.res.json(token);

    return token;

  }

  @Query(() => String)
  async ping() {
    return "Pong!";
  }
}