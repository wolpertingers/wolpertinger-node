import Status = require("http-status-codes");
import getMapping from "./ErrorMapper";

export default function(err: any, req: any, res: any, next: any) {
  res
    .status(err.status ? err.status : Status.BAD_REQUEST)
    .json({ errors: getMapping(err) });
}
