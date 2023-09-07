// const morgan = require("morgan");
const connectDB = require("./db/connect");
const express = require("express");
//Loads environment variables from .env to process.env
const app = express();
const notes = require("./routes/notesRouter");
require("dotenv").config();

app.use(express.static("./src"));
app.use(express.json());

app.use("/api/v1/notes", notes);
console.log("hello world");

// console.log(process.env);
const PORT = 5173;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

start();
