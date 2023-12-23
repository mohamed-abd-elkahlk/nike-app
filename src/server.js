const exprees = require("express");

const app = exprees();

app.get("/", (req, res) => {
  res.send("hi");
});
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`app runnig on http://localhost:${port}`);
});
