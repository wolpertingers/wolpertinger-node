import express = require("express");
import bodyParser = require("body-parser");
import routes from "./boundary";
import { Sequelize } from "sequelize-typescript";
import { Token } from "./entity/Token";

// Database
new Sequelize({
  database: "wolpertinger",
  username: "root",
  password: "wolpertinger",
  host: "localhost",
  port: 3306,
  dialect: "mariadb",
  modelPaths: [__dirname + "/entity"]
});
Token.sync().catch(error => console.log(error));

// Constants
const PORT = 8080;
const HOST = "localhost";

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/tokens", routes.TokenResource);

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
