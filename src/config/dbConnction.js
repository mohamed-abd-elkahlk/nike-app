const mongoose = require("mongoose");

const dbConnection = () => {
  const url = process.env.DB_URL;
  mongoose
    .connect(url)
    .then((conn) => {
      console.log(`dataBase conncted on ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
