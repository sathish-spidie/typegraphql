import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailIsAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(5, 255, { message: "firstName must be atleast more than five char" })
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already taken" })
  email: string;

  @Field()
  password: string;
}
