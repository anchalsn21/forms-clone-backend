const userServices = require("../services/user.services");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const googleLogin = async (req, res, next) => {
  try {
    const googleToken = req.body.googleToken;
    const { user, token } = await userServices.googleSocialLogin(googleToken);
    return res.status(200).send({ user, token, message: "Login Successful" });
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
 * @returns
 */

const getCurrentUser = async (req, res, next) => {
  try {
    const { user, token } = await userServices.getCurrentUser(req.user);
    return res.status(200).send({ user, token, message: "success" });
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
 * @returns
 */
const logoutUser = async (req, res, next) => {
  try {
    const result = await userServices.logoutUser(req.user, req.token);
    return res.status(200).send({ message: "Logout Success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message, error });
  }
};

module.exports = {
  googleLogin,
  getCurrentUser,
  logoutUser,
};
