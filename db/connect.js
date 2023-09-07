const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Successfully connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
