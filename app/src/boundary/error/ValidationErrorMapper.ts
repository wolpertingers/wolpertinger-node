import * as Collections from "typescript-collections";
import { ValidationError } from "class-validator";
import { Error } from "./Error";
import ConstraintMapping from "./ConstraintMapping";

const mappings: ConstraintMapping = require("../../../ConstraintMappings");

/**
 * Map constraint validation error to list of Errors.
 */
export function fromValidationError(
  validationError: ValidationError
): Collections.LinkedList<Error> {
  let errors = new Collections.LinkedList<Error>();
  for (let key in validationError.constraints) {
    let error: Error = new Error(
      key,
      getMessage(validationError.constraints[key]),
      validationError.constraints[key],
      validationError.property
    );
    errors.add(error);
  }
  return errors;
}

function getMessage(template: string): string {
  let mapping = mappings[template];
  return typeof mapping == "object" ? mapping.message : template;
}
