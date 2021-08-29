const formServices = require("../services/form.services");
const { getDtoObject } = require("../helper/common");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const addNewForm = async (req, res, next) => {
  try {
    let fields = ["questions", "name", "description"];
    let addFormDto = getDtoObject(fields, req.body);
    const result = await formServices.addNewForm(addFormDto, req.user);
    return res.status(200).send({ form: result, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllUserForms = async (req, res, next) => {
  try {
    const result = await formServices.getAllUserForms(req.user);
    return res.status(200).send({ allForms: result, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const getSingleFormById = async (req, res, next) => {
  try {
    const result = await formServices.getSingleFormById(req.params.formId);
    return res.status(200).send({ form: result, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, error });
  }
};

module.exports = { addNewForm, getAllUserForms, getSingleFormById };
