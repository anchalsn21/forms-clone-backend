process.env.NODE_ENV = "test";
const formServices = require("../src/services/form.services");
const userServices = require("../src/services/user.services");
const responseServices = require("../src/services/response.services");
const dbHandler = require("./db-handler.js");

/** @description -  Connect to a new in-memory database before running any tests.   */

beforeAll(async () => {
  await dbHandler.connect();
  return true;
});

/** @description -  Clear all test data after every test.*/

afterEach(async () => {
  await dbHandler.clearDatabaseByName("forms");
  await dbHandler.clearDatabaseByName("users");
  await dbHandler.clearDatabaseByName("responses");
});

/** @description -  Remove and close the db and server.*/

afterAll(async () => await dbHandler.closeDatabase());

describe("Form services testing", () => {
  it("creates a new Form", async () => {
    let params = {
      name: "test form",
      description: "test form description",
      price: 0,
      questsions: [{}],
    };
    let user = { _id: "612a2d8285dc2376dd1be1f2" };
    const form = await formServices.addNewForm(params, user);
    return expect(form.name).toEqual(params.name);
  });

  describe("Form services testing", () => {
    it("gets a single Form", async () => {
      let params = {
        name: "test form",
        description: "test form description",
        price: 0,
        questsions: [{}],
      };
      let user = { _id: "612a2d8285dc2376dd1be1f2" };
      const firstForm = await formServices.addNewForm(params, user);

      const form = await formServices.getSingleFormById(firstForm._id);
      return expect(firstForm._id).toEqual(form._id);
    });
  });
});
/**
 * Similarly we can make the test cases for other scenario as well
 *
 */
