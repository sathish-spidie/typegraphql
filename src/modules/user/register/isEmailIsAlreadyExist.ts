import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions
} from "class-validator";
import { Users123 } from "../../../entity/User";

@ValidatorConstraint({ name: "customText", async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(email: string) {
    return Users123.findOne({ where: { email } }).then(user => {
      if (user) {
        return false;
      }
      return true;
    });
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  // tslint:disable-next-line: ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: "IsEmailAlreadyExist",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEmailAlreadyExistConstraint
    });
  };
}
