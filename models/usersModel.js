const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const validator = require("validator");

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

// userSchema.post("save", async function () {
//   const token = await promisify(jwt.sign)(
//     { id: this._id },
//     process.env.JWT_SECRET
//   );
// });

userSchema.methods.correctPassword = async function (
  userPassword,
  hashedPassword
) {
  const correct = await bcrypt.compare(userPassword, hashedPassword);
  console.log(userPassword, hashedPassword);
  if (!correct) return next(AppError("Incorrect password", 400));
  return true;
};

module.exports = mongoose.model("User", userSchema);
