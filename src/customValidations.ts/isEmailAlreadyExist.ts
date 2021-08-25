import {
    registerDecorator,
    ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { User } from "../entities/user";

@ValidatorConstraint()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
 async validate(email: string) {
    const user = await User.findOne({ email });

    if (!user) {
      return true;
    } else {
      return false;
    }
  }
}



export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint
      });
    };
  }