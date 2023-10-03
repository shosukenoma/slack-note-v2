const asyncWrapper = require("express-async-wrap");
const User = require("../models/usersModel");
const AppError = require("../utils/appError");

const register = asyncWrapper(async (req, res) => {
  const newUser = await User.create(req.body);
  const { email, profileName } = newUser;
  res.status(200).json({ data: { email, profileName } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password or email", 401));
  }

  return res.status(200).json({ status: "success" });
});

module.exports = { register, login };
