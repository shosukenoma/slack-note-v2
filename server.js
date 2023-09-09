// const morgan = require("morgan");
const connectDB = require("./db/connect");
const express = require("express");
const asyncWrapper = require("express-async-wrap");
//Loads environment variables from .env to process.env
const app = express();
const notes = require("./routes/notesRouter");
const users = require("./routes/usersRouter");
require("dotenv").config();

app.use(express.static("./src"));
app.use(express.json());

app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);

const PORT = 5173;
const start = asyncWrapper(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
});

start();
