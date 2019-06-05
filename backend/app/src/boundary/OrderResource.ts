import { Router } from "express";
import { Order } from "../entity/Order";
import Status = require("http-status-codes");
import { Repository, getRepository, DeepPartial } from "typeorm";
import { ImageReference } from "../entity/ImageReference";
import { validate } from "class-validator";

const router = Router();

/**
 * Get all visible orders.
 */
router.get("/", (req, res, next) => {
  getRepository(Order)
    .find({
      where: {
        visible: true
      }
    })
    .then(orders => {
      return res.status(Status.OK).send(orders);
    })
    .catch(errors => next(errors));
});

/**
 * Create new order.
 */
router.post("/", (req, res, next) => {
  const orderRepository: Repository<Order> = getRepository(Order);
  const entity: DeepPartial<Order> = req.body;
  let order: Order = orderRepository.create(entity);
  order.configuration = getConfiguration(order.images);
  validate(order).then(errors => {
    if (errors.length > 0) {
      next(errors);
    } else {
      orderRepository
        .save(order)
        .then(order => {
          return res.status(Status.CREATED).send(order);
        })
        .catch(errors => next(errors));
    }
  });
});

export default router;

/**
 * Create configuration string based on images.
 *
 * @param references Collection of ImageReferences of the order.
 */
function getConfiguration(references: ImageReference[]): string {
  let configs: number[] = new Array();
  for (let i = 0; i < references.length; i++) {
    configs[i] = references[i].image.id;
  }
  return JSON.stringify(configs.sort());
}
