import { Router } from "express";
import { Token } from "../entity/Token";
import Status = require("http-status-codes");
import basicAuth = require("express-basic-auth");
import { Guid } from "guid-typescript";

const router = Router();
const auth = basicAuth({
  users: {
    admin: "admin"
  }
});

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
router.use(auth).post("/", (req, res, next) => {
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
router.use(auth).get("/", (req, res, next) => {
  Token.findAll()
    .then(tokens => {
      return res.status(Status.OK).send(tokens);
    })
    .catch(errors => {
      return res.status(Status.BAD_REQUEST).send({ errors: errors });
    });
});

export default router;
