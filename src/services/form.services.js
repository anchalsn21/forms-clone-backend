const Forms = require("../models/form.model");
const { ObjectId } = require("mongoose").Types;
const { getFormUrl } = require("../helper/common");

/**
 *
 * @param {*} addFormDto
 * @param {*} user
 * @returns
 */

const addNewForm = async (addFormDto, user) => {
  let formObject = {
    name: addFormDto.name,
    description: addFormDto.description,
    questions: addFormDto.questions,
    responseCount: 0,
    user: user._id,
  };
  const form = await new Forms(formObject);
  form.url = getFormUrl(form._id);
  await form.save();
  return form;
};

/**
 *
 * @param {*} user
 * @returns
 */

const getAllUserForms = async (user) => {
  const condition = { user: ObjectId(user._id) };
  const allForms = await Forms.find(condition).populate("user", "email name");
  return allForms;
};

/**
 *
 * @param {*} formId
 * @returns
 */

const getSingleFormById = async (formId) => {
  const condition = { _id: ObjectId(formId) };
  const form = await Forms.findOne(condition).populate("user", "email name");
  return form;
};

module.exports = { addNewForm, getAllUserForms, getSingleFormById };
