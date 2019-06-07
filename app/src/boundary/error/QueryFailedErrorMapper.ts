import { Error } from "./Error";
import { QueryFailedError } from "typeorm";
import ConstraintMapping from "./ConstraintMapping";

const mappings: ConstraintMapping = require("../../../ConstraintMappings");

/**
 * Map sql error to Error.
 */
export function fromQueryFailedError(queryFailure: QueryFailedError): Error {
  let error: Error;
  const message: string = queryFailure.message.toLowerCase();
  Object.keys(mappings).forEach(key => {
    if (message.includes(key.toLowerCase())) {
      const mapping = mappings[key];
      error = new Error(queryFailure.name, mapping.message, key, mapping.field);
    }
  });
  return error
    ? error
    : new Error(queryFailure.name, queryFailure.message, null, null);
}
