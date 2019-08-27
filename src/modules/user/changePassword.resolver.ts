import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { ForgotPasswordPrefix } from "../../constant";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import bcrypt from "bcrypt";
import { ChangePasswordInput } from "./changePassword/ChangeInputType";
import { MyContext } from "../../types/Mycontext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
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

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    await redis.del(ForgotPasswordPrefix + token);

    ctx.req.session!.userId = user.id;
    return user;
  }
}
