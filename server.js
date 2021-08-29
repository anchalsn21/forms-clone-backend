const app = require("./app");
const { port } = require("./src/utility/config");

app.listen(port, () => console.log(`Example app listening on port `, port));
