import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/Mycontext";

export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  if (!req.session!.userId) {
    throw new Error("Please authenticate dude");
  }
  console.log("good to go");
  await next();
};
