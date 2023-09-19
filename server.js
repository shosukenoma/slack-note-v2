// const morgan = require("morgan");
const connectDB = require("./db/connect");
const express = require("express");
const asyncWrapper = require("express-async-wrap");
//Loads environment variables from .env to process.env
const app = express();
const cors = require("cors");
const errors = require("./controllers/errorsController");
const posts = require("./routes/postsRouter");
const users = require("./routes/usersRouter");
require("dotenv").config();

app.use(express.static("./src"));
app.use(express.json());
app.use(cors());
app.use("/api/v1/posts", posts);
app.use("/api/v1/users", users);
app.use(errors);

const port = process.env.PORT || 8080;
const start = asyncWrapper(async () => {
  await connectDB(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
    console.log(process.env.NODE_ENV);
  });
});

start();
