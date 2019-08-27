import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { ConfirmUserPrefix } from "../../constant";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean, { nullable: true })
  async confirmation(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(ConfirmUserPrefix + token);
    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);

    return true;
  }
}
