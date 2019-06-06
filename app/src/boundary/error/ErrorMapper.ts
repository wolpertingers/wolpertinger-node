import { Error } from "./Error";
import { ValidationError } from "class-validator";
import { QueryFailedError } from "typeorm";
import * as Collections from "typescript-collections";
import { fromValidationError } from "./ValidationErrorMapper";
import { fromQueryFailedError } from "./QueryFailedErrorMapper";

/**
 * Map an object to an array of Errors.
 * @see Error
 * @param err Exception or array of Exceptions.
 */
export default function getMapping(err: any): Error[] {
  let errors = new Collections.LinkedList<Error>();
  switch (err.constructor.name) {
    case Array.name:
      for (let i = 0; i < err.length; i++) {
        getErrors(err[i]).forEach(error => errors.add(error));
      }
      break;
    default:
      getErrors(err).forEach(error => errors.add(error));
  }
  return errors.toArray();
}

/**
 * Map the Exception to an array of Errors.
 * @param err Exception.
 */
function getErrors(err: any): Collections.LinkedList<Error> {
  let errors = new Collections.LinkedList<Error>();
  const name = err.constructor.name;
  switch (name) {
    case ValidationError.name:
      // constraint validation
      return fromValidationError(err);
    case QueryFailedError.name:
      // SQL failure
      errors.add(fromQueryFailedError(err));
      break;
    default:
      // unknown error
      errors.add(
        new Error(
          err.constructor ? err.constructor.name : Error.name,
          err.stack,
          null,
          null
        )
      );
  }
  return errors;
}
