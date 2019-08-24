import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Mycontext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id: ctx.req.session!.userId }
    });


    if (!user) {
      return undefined;
    }
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    return user;
  }
}
