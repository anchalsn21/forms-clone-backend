const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller");
const { userAuth } = require("../middlewares/user_auth");

router.post("/add-new-form", userAuth, formController.addNewForm);

router.get("/get-all-forms", userAuth, formController.getAllUserForms);

router.get("/:formId", formController.getSingleFormById);

module.exports = router;
