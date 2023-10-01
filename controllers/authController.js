const asyncWrapper = require("express-async-wrap");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signup = asyncWrapper(async (req, res) => {
  const newUser = await User.create({
    email: req.body.email,
    profileName: req.body.profileName,
    password: req.body.password,
  });

  const token = signToken(req.body._id);
  res.status(200).json({ token, data: newUser });
});

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and password"));

  const user = await User.findOne({ email });
  if (user.correctPassword()) {
    return res.status(200).json({ status: "success" });
  } else {
    return res.status(400).json({ status: "fail" });
  }

  //   if (!user) return next(new AppError("The email or password is incorrect"));

  //   const token = signToken();
  //   const decoded = await jwt.verify(token);
  //   console.log("token:" + token, "decoded:" + decoded);

  res.status(200).json({ user });
});

module.exports = { signup, login };
