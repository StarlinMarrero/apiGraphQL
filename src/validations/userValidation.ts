import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(10)
  @MinLength(3)
  password: string;
}
