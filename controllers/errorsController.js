const AppError = require("../utils/appError");

const sendError = (err, req, res, next) => {
  //Default
  const error = new AppError(err.message || "Something went wrong", 400);

  //Duplicate users
  if (err.code === 11000) {
    error.message = `${Object.keys(err.keyValue)} is already taken`;
  }
  //Invalid Endpoints
  if (err.name === "CastError") {
    error.message = `${err.value} is not a valid ${err.path}`;
  }
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
  }

  res.json({
    status: error.status,
    message: error.message,
    error,
    // stack: error.stack,
  });
};

module.exports = sendError;
