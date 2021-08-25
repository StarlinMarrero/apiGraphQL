import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../customValidations.ts/isEmailAlreadyExist";

@InputType()
export class UserInput {

  @Field()
  name: string;


  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({message: "this email already exist."})
  email: string;

  @Field()
  @MaxLength(10)
  @MinLength(3)
  password: string;
}
