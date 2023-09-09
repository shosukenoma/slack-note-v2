const asyncWrapper = require("express-async-wrap");

const getAll(model) = asyncWrapper(async (req, res, next) => {
  const allNotes = await Note.find({});
  res.status(200).json({ allNotes });
  next();
});

const createNote = asyncWrapper(async (req, res, next) => {
  const newNote = await Note.create(req.body);
  res.status(200).json({ newNote });
  next();
});

const deleteNote = asyncWrapper(async (req, res, next) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({ note: null, status: "success" });
  next();
});

const updateNote = asyncWrapper(async (req, res, next) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedNote });
});

module.exports = { createNote, getAllNotes, deleteNote, updateNote };