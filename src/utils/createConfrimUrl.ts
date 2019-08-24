import { v4 } from "uuid";
import { redis } from "../redis";
import { ConfirmUserPrefix } from "../constant";

export const createConfirmUrl = async (userId: number) => {
  const token = v4();

  await redis.set(ConfirmUserPrefix + token, userId, "ex", 60 * 60 * 24); // ond Day Expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
