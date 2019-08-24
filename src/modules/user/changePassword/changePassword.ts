import { Resolver, Mutation, Arg } from "type-graphql";
import { ForgotPasswordPrefix } from "../../../constant";
import { User } from "../../../entity/User";
import { redis } from "../../../redis";
import bcrypt from "bcrypt";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ): Promise<User | null> {
    const userId = await redis.get(ForgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne({ id: parseInt(userId, 10) });

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
