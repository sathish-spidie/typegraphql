import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/Mycontext";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  console.log("args :", args);
  await next();
};
