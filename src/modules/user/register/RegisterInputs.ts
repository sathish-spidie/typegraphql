import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
// import { IsEmailAlreadyExist } from "./isEmailIsAlreadyExist";
import { PasswordInput } from "../../../Shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(3, 255, { message: "firstName must be atleast more than five char" })
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  // @IsEmailAlreadyExist({ message: "Email already taken" })
  email: string;
}
