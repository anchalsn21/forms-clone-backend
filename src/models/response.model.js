const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    name: { type: String },
    addedBy: { type: String },
    form: { type: Schema.Types.ObjectId, ref: "forms" },
    questions: [{ type: Object }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Responses = mongoose.model("responses", responseSchema);
module.exports = Responses;
