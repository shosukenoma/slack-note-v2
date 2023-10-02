const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const validator = require("validator");
const asyncWrapper = require("express-async-wrap");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email."],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profileName: {
    type: String,
    trim: true,
    required: [true, "Please provide a profile name."],
  },
  password: {
    type: String,
    minLength: [8, "Password must be atleast 8 characters."],
    required: [true, "Please provide a password."],
    select: false,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = asyncWrapper(async function (
  userPassword,
  hashPassword
) {
  return await bcrypt.compare(userPassword, hashPassword);
});

module.exports = mongoose.model("User", userSchema);
