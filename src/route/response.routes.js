const express = require("express");
const router = express.Router();
const responseController = require("../controllers/response.controller");

const { userAuth } = require("../middlewares/user_auth");

router.post("/add-new-response", responseController.addNewResponse);

router.get(
  "/get-all-response/:formId",
  userAuth,
  responseController.getAllResponseByFormId
);

router.get("/:responseId", userAuth, responseController.getSingleResponseById);

module.exports = router;
