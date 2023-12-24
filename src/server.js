const exprees = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/dbConnction");
const app = exprees();

// DataBase connction function
// dbConnection();

// some middlewers
process.env.MODE === "devlopment" ? app.use(morgan("dev")) : "";

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`app runnig on http://localhost:${port}`);
});
