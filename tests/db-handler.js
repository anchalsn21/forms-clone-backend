const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
var mongod;
/** @description - Connect to the in-memory database. */

const connect = async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri(), {
    useNewUrlParser: true,
    dbName: "test_form_clone",
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

/**@description -Drop database, close the connection and stop mongod.*/

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/** @description - Remove all the data for all db collections.*/
const clearDatabase = async () => {
  const collections = await mongoose.connection.collections;
  //   console.log({ collections });
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

/**
 * @description - Remove all the data for db collections with name provided as param
 * @param {string} - The name of the collection which needs to be cleared
 */
const clearDatabaseByName = async (name) => {
  const collections = mongoose.connection.collections;
  //   console.log("I nside clearDatabaseByName", collections);
  if (collections[name]) {
    const collection = collections[name];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
  clearDatabaseByName,
};
