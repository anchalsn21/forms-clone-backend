const mongoose = require("mongoose");
const { database, env } = require("../src/utility/config");
let client = null;

(async function () {
  try {
    client = await mongoose.connect(database.uri, database.options);
  } catch (error) {
    //@TODO - On production exit and stop the server if mongodb does not work
    console.log(error);
    process.exit(-1);
  }
})();

mongoose.connection
  .once("open", () => {
    console.log("MongoDB connected successfully");
  })
  .on("error", (error) => {
    //@TODO - On production exit and stop the server if mongodb does not work
    process.exit(-1);
  });

if (env === "development") {
  //   mongoose.set("debug", true);
}
module.exports = client;
