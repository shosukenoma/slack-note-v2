const mongoose = require("mongoose");

postsSchema = new mongoose.Schema(
  {
    content: { type: String, required: [true, "post cannot be empty"] },
    isPinned: { type: Boolean, default: false },
    dateCreated: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Post", postsSchema);
