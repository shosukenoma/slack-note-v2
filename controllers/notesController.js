const Note = require("../models/notesModel");
const asyncWrapper = require("express-async-wrap");

const getNotes = asyncWrapper(async (req, res, next) => {
  res.status(200).json(Note.find());
  next();
});

const createNote = asyncWrapper(async (req, res, next) => {
  const newNote = await Note.create(req.body);
  res.status(200).json({ newNote });
  next();
});

module.exports = { createNote, getNotes };
