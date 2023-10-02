const asyncWrapper = require("express-async-wrap");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signup = asyncWrapper(async (req, res) => {
  const newUser = await User.create(req.body);
  const { email, profileName } = newUser;
  const token = signToken(req.body._id);
  res.status(200).json({ token, data: { email, profileName } });
});

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect password or email", 401));
  }

  return res.status(200).json({ status: "success", data: { password, user } });
  //   if (!user) return next(new AppError("The email or password is incorrect"));
  //   const token = signToken();
  //   const decoded = await jwt.verify(token);
  //   console.log("token:" + token, "decoded:" + decoded);
});

module.exports = { signup, login };
