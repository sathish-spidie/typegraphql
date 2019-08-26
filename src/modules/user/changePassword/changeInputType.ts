import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../../Shared/PasswordInput";

@InputType()
// tslint:disable-next-line: max-classes-per-file
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
