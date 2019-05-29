require("dotenv").config();
import { createConnection } from "typeorm";
import express = require("express");
import bodyParser = require("body-parser");
import routes from "./boundary";
import ImageLoader from "./control/ImageLoader";
import cors = require("cors");
import { Token } from "./entity/Token";
import { Image } from "./entity/Image";
import { Order } from "./entity/Order";
import { ImageReference } from "./entity/ImageReference";

// Database
createConnection({
  type: "mariadb",
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_USERNAME
    ? process.env.MYSQL_PASSWORD
    : process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [Token, Image, Order, ImageReference],
  synchronize: true,
  logging: true
}).then(() => {
  // Images
  ImageLoader.loadImages();
});

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/tokens", routes.TokenResource);
app.use("/images", routes.ImageResource);
app.use("/orders", routes.OrderResource);

const PORT: number = Number(process.env.APP_PORT);
app.listen(PORT);
console.log(`Running on port ${PORT}`);
