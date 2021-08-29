const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { userAuth } = require("../middlewares/user_auth");

router.post("/google-login", userController.googleLogin);

router.get("/get-current-user", userAuth, userController.getCurrentUser);

router.post("/logout", userAuth, userController.logoutUser);

module.exports = router;
