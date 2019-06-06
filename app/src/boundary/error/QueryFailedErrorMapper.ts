import { Error } from "./Error";
import { QueryFailedError } from "typeorm";
import { ConstraintMapping } from "./ConstraintMapping";

const mappings: ConstraintMapping[] = [
  {
    name: "Image_name_unique",
    field: "name",
    message: "Name of the image already taken."
  },
  {
    name: "Image_high_unique",
    field: "high",
    message: "High resolution path can only be referenced once."
  },
  {
    name: "Image_medium_unique",
    field: "high",
    message: "Medium resolution path can only be referenced once."
  },
  {
    name: "Image_low_unique",
    field: "high",
    message: "Low resolution path can only be referenced once."
  },
  {
    name: "Order_orderer_unique",
    field: "orderer",
    message: "Orderer name must be unique."
  },
  {
    name: "Order_configuration_unique",
    field: "configuration",
    message: "This configuration has already been created."
  },
  {
    name: "ImageReference_level_unique",
    field: "images",
    message: "Image reference level is contained more than once."
  },
  {
    name: "ImageReference_image_unique",
    field: "images",
    message: "Image is referenced more than once."
  },
  {
    name: "Token_value_unique",
    field: "value",
    message: "Token has to be unique."
  },
  {
    name: "Order_token_unique",
    field: "token",
    message: "A token can only be referenced once."
  }
];

/**
 * Map sql error to Error.
 */
export function fromQueryFailedError(queryFailure: QueryFailedError): Error {
  let error: Error;
  const message: string = queryFailure.message.toLowerCase();
  mappings.forEach(mapping => {
    if (message.includes(mapping.name.toLowerCase())) {
      error = new Error(
        queryFailure.name,
        mapping.message,
        mapping.name,
        mapping.field
      );
    }
  });
  return error
    ? error
    : new Error(queryFailure.name, queryFailure.message, null, null);
}
