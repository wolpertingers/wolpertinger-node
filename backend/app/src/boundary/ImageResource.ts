import { Router } from "express";
import { Image } from "../entity/Image";
import Status = require("http-status-codes");
import { Repository, getRepository } from "typeorm";

const router = Router();

/**
 * Get all images.
 */
router.get("/", (req, res) => {
  getRepository(Image)
    .find()
    .then(images => {
      return res.status(Status.OK).send(images);
    })
    .catch(errors => {
      return res.status(Status.BAD_REQUEST).send({ errors: errors });
    });
});

export default router;
