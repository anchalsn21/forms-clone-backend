const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../utility/config");

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    let decode = null;
    try {
      decode = jwt.verify(token, jwtSecret);
    } catch (err) {
      throw new Error("Authentication Failure");
    }

    if (!decode) {
      throw new Error("Authentication Failure");
    }

    const user = await Users.findOne(
      { _id: decode._id, "tokens.token": token },
      { tokens: 0 }
    );
    if (!user) {
      throw new Error("No user found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log({ e });
    return res.status(401).send({
      message: "Authentication Failure",
      error: e.message,
      isError: true,
    });
  }
};

module.exports = { userAuth };
