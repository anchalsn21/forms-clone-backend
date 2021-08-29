const { OAuth2Client } = require("google-auth-library");
const { googleClientId } = require("../utility/config");
const client = new OAuth2Client(googleClientId);
const Users = require("../models/user.model");
const axios = require("axios");
const { ObjectId } = require("mongoose").Types;

const googleSocialLogin = async (googleToken) => {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: googleClientId,
  });

  const data = ticket.getPayload();
  if (!data) {
    throw new Error("Failure in getting the user data");
  }

  const { email = "", name = "", picture = "" } = data;
  const condition = { email: email.toLowerCase() };
  const exist = await Users.findOne(condition);
  if (exist) {
    const user = exist;
    const token = await user.generateToken();
    user.googleResponse = data;
    await user.save();
    return { user, token };
  }

  let userObject = {
    email: email.toLowerCase(),
    name: name,
    picture: picture,
  };
  let user = await new Users(userObject);
  let token = await user.generateToken();
  user.googleResponse = data;
  await user.save();
  return { user, token };
};

const getCurrentUser = async (user) => {
  return user;
};

const logoutUser = async (user, token) => {
  let usr = await Users.findOne({ _id: user._id });
  let tokens = usr.tokens.filter((tok) => tok !== token);
  usr.tokens = tokens;
  await usr.save();
  return usr;
};

module.exports = {
  googleSocialLogin,
  getCurrentUser,
  logoutUser,
};
