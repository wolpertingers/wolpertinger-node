import { Router } from "express";
import { Token } from "../entity/Token";
import Status = require("http-status-codes");
import basicAuth = require("express-basic-auth");
import { Guid } from "guid-typescript";

const router = Router();
const auth = basicAuth({ authorizer: adminAuthorizer });

/**
 * Authorizes a user to the Rest-API.
 * @param username Name of the user
 * @param password Entered password
 */
function adminAuthorizer(username: string, password: string) {
  return (
    basicAuth.safeCompare(username, process.env.ADMIN_NAME) &&
    basicAuth.safeCompare(password, process.env.ADMIN_PASSWORD)
  );
}

/**
 * Get token by value.
 */
router.get("/:value", (req, res) => {
  Token.findOne({
    where: {
      value: req.params.value
    }
  })
    .then(token => res.status(Status.OK).send(token))
    .catch(error => res.status(Status.BAD_REQUEST).send(error));
});

/**
 * Create random token.
 */
router.use(auth).post("/", (req, res) => {
  Token.create({
    value: Guid.create().toString()
  })
    .then(token => {
      return res.status(Status.CREATED).send(token);
    })
    .catch(errors => {
      return res.status(Status.BAD_REQUEST).send({ errors: errors });
    });
});

/**
 * Get all tokens.
 */
router.use(auth).get("/", (req, res) => {
  Token.findAll()
    .then(tokens => {
      return res.status(Status.OK).send(tokens);
    })
    .catch(errors => {
      return res.status(Status.BAD_REQUEST).send({ errors: errors });
    });
});

export default router;
