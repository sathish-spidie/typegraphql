import { Resolver, Mutation, Arg } from "type-graphql";
import { ForgotPasswordPrefix } from "../../../constant";
import { Users123 } from "../../../entity/User";
import { redis } from "../../../redis";
import bcrypt from "bcrypt";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Users123, { nullable: true })
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ): Promise<Users123 | null> {
    const userId = await redis.get(ForgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await Users123.findOne({ id: parseInt(userId, 10) });

    console.log(user);

    if (!user) {
      return null;
    }

    user.password = await bcrypt.hash(newPassword, 12);

    await user.save();

    await redis.del(ForgotPasswordPrefix + token);

    return user;
  }
}
