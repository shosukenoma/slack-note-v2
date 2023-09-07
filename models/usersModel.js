const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  picture: { type: String },
});

module.exports = userSchema;
