import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class PasswordInput {
  @Length(3, 255)
  @Field()
  password: string;
}
