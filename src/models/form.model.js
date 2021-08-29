const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    name: { type: String },
    url: { type: String },
    description: { type: String },
    questions: [{ type: Object }],
    isDeleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    responseCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Forms = mongoose.model("forms", formSchema);
module.exports = Forms;
