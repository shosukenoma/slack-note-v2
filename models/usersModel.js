const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: [6, "username must be atleast 6 character."],
    unique: true,
    required: [true, "username can not be empty."],
  },
  password: {
    type: String,
    minLength: [8, "password must be atleast 8 characters."],
    required: [true, "password can not be empty."],
  },
});

module.exports = mongoose.model("User", userSchema);
