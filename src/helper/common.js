const { formBaseUrl } = require("../utility/config");

const getFormUrl = (id) => {
  return `${formBaseUrl}/${id}/add-response`;
};
const getDtoObject = (fields, body) => {
  let ret = {};
  fields.map((key) => {
    if (body[key]) {
      ret[key] = body[key];
    }
  });

  return ret;
};

module.exports = { getDtoObject, getFormUrl };
