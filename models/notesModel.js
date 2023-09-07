const mongoose = require("mongoose");

notesSchema = new mongoose.Schema(
  {
    message: { type: String },
  }
  //   { timestamps: true }
);

module.exports = mongoose.model("Note", notesSchema);
