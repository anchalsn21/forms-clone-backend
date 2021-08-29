require("dotenv").config();

const database = {
  uri: process.env.DATABASE_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const env = "development";

const port = process.env.PORT;

const jwtSecret = process.env.JWT_SECRET;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const formBaseUrl = process.env.FORM_BASE_URL;

const config = {
  database,
  env,
  port,
  jwtSecret,
  googleClientId,
  formBaseUrl,
};

module.exports = config;
