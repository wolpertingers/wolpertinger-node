import * as Collections from "typescript-collections";
import { ValidationError } from "class-validator";
import { Error } from "./Error";
import PropertiesReader = require("properties-reader");

const properties = PropertiesReader(
  __dirname + "/ValidationMessages.properties"
);

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

/**
 * Find value of a given property.
 * @param template Property name.
 */
function getMessage(template: string): string {
  let property = properties.get(template);
  return typeof property == "string" ? property : template;
}
