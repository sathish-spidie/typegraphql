import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/changePassword.resolver";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser.resolver";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword.resolver";
import { LoginResolver } from "../modules/user/Login.resolver";
import { LogoutResolver } from "../modules/user/Logout.resolver";
import { MeResolver } from "../modules/user/Me.resolver";
import { RegisterResolver } from "../modules/user/Register.resolver";
import { CreateUserResolver } from "../modules/user/CreateResolver";
import { AddProfilePictureResolver } from "../modules/user/ProfilePicture";
import { GetAllUserResolver } from "../modules/GetAllUser";

export const genSchema = () => {
  return buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      AddProfilePictureResolver,
      GetAllUserResolver
    ],
    authChecker: ({ context: { req } }) => {
      if (!req.session!.userId) {
        return false;
      }
      return true;
    }
  });
};
