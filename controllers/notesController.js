const Note = require("../models/notesModel");
const factory = require("./handlerFactory");

const getAllNotes = factory.getAllDocuments(Note);

const createNote = factory.createDocument(Note);

const deleteNote = factory.deleteDocument(Note);

const updateNote = factory.updateDocument(Note);

module.exports = { createNote, getAllNotes, deleteNote, updateNote };
