const exprees = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/dbConnction");
const { ApiError } = require("./utils");
const routes = require("./routes");

const app = exprees();

// DataBase connction function
dbConnection();

// some middlewers
process.env.MODE === "devlopment" ? app.use(morgan("dev")) : "";
app.use(exprees.json());
// routes
app.use("/api/v1", routes);

app.all("*", (req, res, next) => {
  next(
    new ApiError(`no route found with this endpoint: '${req.originalUrl}'`, 404)
  );
});

// error handel
app.use(require("./middlewares/error.middlewares"));
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`app runnig on http://localhost:${port}`);
});
