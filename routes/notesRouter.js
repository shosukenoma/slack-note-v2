const express = require("express");
const notesController = require("../controllers/notesController");

router = express.Router();

router.route("/").post(notesController.createNote);

module.exports = router;
