const Responses = require("../models/response.model");
const Forms = require("../models/form.model");
const { ObjectId } = require("mongoose").Types;

const addNewResponse = async (newResponseDto) => {
  let condition = { form: ObjectId(newResponseDto.form) };

  let form = await Forms.findOne(condition);
  if (!form) throw new Error("No Form found");
  const responseObject = {
    addedBy: newResponseDto.addedBy,
    form: newResponseDto.form,
    questions: newResponseDto.questions,
  };
  const response = await Responses(responseObject);
  await response.save();
  form.responseCount = form.responseCount + 1;
  await form.save();
  //   await Forms.updateOne(
  //    condition,
  //     { $inc: { responseCount: 1 } }
  //   );
  return response;
};

const getAllResponseByFormId = async (formId) => {
  const condition = { form: ObjectId(formId) };
  const allResponses = await Responses.find(condition).populate(
    "form",
    "name url description createdAt"
  );
  return allResponses;
};

const getSingleResponseById = async (responseId, user) => {
  const condition = { _id: ObjectId(responseId) };
  const response = await Responses.findOne(condition).populate(
    "form",
    "name url description createdAt"
  );
  return response;
};

module.exports = {
  addNewResponse,
  getAllResponseByFormId,
  getSingleResponseById,
};
