const express = require("express");
const router = express.Router();

const formRoutes = require("./form.routes");
const userRoutes = require("./user.routes");
const responseRoutes = require("./response.routes");

router.use("/form", formRoutes);

router.use("/user", userRoutes);

router.use("/response", responseRoutes);

module.exports = router;
