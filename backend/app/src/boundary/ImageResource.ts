import { Router } from "express";
import { Image } from "../entity/Image";
import Status = require("http-status-codes");
import { getRepository } from "typeorm";

const router = Router();

/**
 * Get all images.
 */
router.get("/", (req, res, next) => {
  getRepository(Image)
    .find()
    .then(images => {
      return res.status(Status.OK).send(images);
    })
    .catch(errors => next(errors));
});

export default router;
