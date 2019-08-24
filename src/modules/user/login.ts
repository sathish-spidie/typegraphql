import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";

import { MyContext } from "../../types/Mycontext";
import { User } from "../../entity/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const valid = bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    // If didn't get a cookie in devtools log Make sure the request.credentials: "include" in graphql playground
    ctx.req.session!.userId = user.id;

    return user;
  }
}
