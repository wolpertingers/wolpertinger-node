import { Router } from "express";
import { Image } from "../entity/Image";
import Status = require("http-status-codes");

const router = Router();

/**
 * Get all images.
 */
router.get("/", (req, res) => {
  Image.findAll()
    .then(images => {
      return res.status(Status.OK).send(images);
    })
    .catch(errors => {
      return res.status(Status.BAD_REQUEST).send({ errors: errors });
    });
});

export default router;
