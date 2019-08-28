import { Resolver, Query } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class GetAllUserResolver {
  @Query(() => [User])
  async getuser(): Promise<User[] | undefined> {
    const user = await User.find({});
    if (!user) {
      return undefined;
    }
    return user;
  }
}
