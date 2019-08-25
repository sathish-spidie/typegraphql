import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class PasswordInput {
  @Field()
  @Length(3, 255)
  password: string;
}
