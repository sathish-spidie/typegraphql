import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcrypt";

import { MyContext } from "../../types/Mycontext";
import { Users123 } from "../../entity/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => Users123, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<Users123 | null> {
    const user = await Users123.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (user.confirmed === true && valid === true) {
      ctx.req.session!.userId = user.id;
      return user;
    }

    return null;
    // If didn't get a cookie in devtools log Make sure the request.credentials: "include" in graphql playground
  }
}
