import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { v4 } from "uuid";
import { sendEmail } from "../../utils/sendEmail";
import { ForgotPasswordPrefix } from "../../constant";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    const token = v4();

    await redis.set(ForgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // ond Day Expiration

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  }
}
