const express = require("express");
const app = express();
const cors = require("cors");
const mainRoutes = require("./src/route/index");

require("./db/database");

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());

app.use("/", mainRoutes);

module.exports = app;
