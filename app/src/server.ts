require("dotenv").config();
import express = require("express");
import bodyParser = require("body-parser");
import routes from "./boundary";
import { Sequelize } from "sequelize-typescript";
import { Token } from "./entity/Token";
import { Image } from "./entity/Image";
import ImageLoader from "./control/ImageLoader";

// Database
new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  host: "localhost",
  port: 3306,
  dialect: "mariadb",
  modelPaths: [__dirname + "/entity"]
});
Token.sync().catch(error => console.log(error));
Image.sync().catch(error => console.log(error));

// Images
ImageLoader.loadImages();

// Constants
const PORT = 8080;
const HOST = "localhost";

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/tokens", routes.TokenResource);
app.use("/images", routes.ImageResource);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
