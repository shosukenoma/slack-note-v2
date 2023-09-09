const express = require("express");
const {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");

router = express.Router();

router.route("/").post(createNote).get(getAllNotes);

router.route("/:id").delete(deleteNote).patch(updateNote);
module.exports = router;
