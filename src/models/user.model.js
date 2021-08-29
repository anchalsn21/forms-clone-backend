const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { jwtSecret } = require("../utility/config");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    picture: { type: String },
    googleResponse: { type: Object },
    isDeleted: { type: Boolean, default: false },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  let user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    jwtSecret
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  //   if (user.isModified("password")) {
  //     user.password = await bcrypt.hashSync(user.password, saltRounds);
  //   }
  next();
});

const Users = mongoose.model("users", userSchema);
module.exports = Users;
