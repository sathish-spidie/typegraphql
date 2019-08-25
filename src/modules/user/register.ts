import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { Users123 } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInputs";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmUrl } from "../../utils/createConfrimUrl";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => Users123)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<Users123> {
    const hashedpassword = await bcrypt.hash(password, 12);
    const user = await Users123.create({
      firstName,
      lastName,
      email,
      password: hashedpassword
    }).save();

    await sendEmail(user.email, await createConfirmUrl(user.id));

    return user;
  }
}
