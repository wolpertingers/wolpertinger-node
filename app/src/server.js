"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./boundary");

// Constants
const PORT = 8080;
const HOST = "127.0.0.1";

// App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
