const responseServices = require("../services/response.services");
const { getDtoObject } = require("../helper/common");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const addNewResponse = async (req, res, next) => {
  try {
    const fields = ["addedBy", "form", "questions"];
    const addResponseDto = getDtoObject(fields, req.body);
    const result = await responseServices.addNewResponse(addResponseDto);
    return res.status(200).send({ result, message: "success" });
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

const getAllResponseByFormId = async (req, res, next) => {
  try {
    const { formId = "" } = req.params;
    const result = await responseServices.getAllResponseByFormId(formId);
    return res.status(200).send({ allResponses: result, message: "success" });
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

const getSingleResponseById = async (req, res, next) => {
  try {
    const { responseId = "" } = req.params;
    const result = await responseServices.getSingleResponseById(responseId);
    return res.status(200).send({ response: result, message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, error });
  }
};

module.exports = {
  addNewResponse,
  getAllResponseByFormId,
  getSingleResponseById,
};
