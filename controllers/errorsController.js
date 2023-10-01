const AppError = require("../utils/appError");

const sendError = (err, req, res, next) => {
  let message = "Something went wrong";
  //Duplicate users
  if (err.code === 11000) {
    message = `${Object.keys(err.keyValue)} is already taken`;
  }
  //Invalid Endpoints
  if (err.name === "CastError") {
    message = `${err.value} is not a valid ${err.path}`;
  }
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
  }

  const error = new AppError(message, 400);
  res.json({
    status: error.status,
    message: error.message,
    error,
    // stack: error.stack,
  });
};

module.exports = sendError;
