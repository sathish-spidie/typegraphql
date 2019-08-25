import { Resolver, Query, Ctx } from "type-graphql";
import { Users123 } from "../../entity/User";
import { MyContext } from "../../types/Mycontext";

@Resolver()
export class MeResolver {
  @Query(() => Users123, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<Users123 | undefined> {
    const user = await Users123.findOne({
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
