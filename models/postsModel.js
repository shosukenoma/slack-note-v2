const mongoose = require("mongoose");

postsSchema = new mongoose.Schema(
  {
    content: { type: String, required: [true, "post cannot be empty"] },
    isPinned: { type: Boolean, default: false },
    dateCreated: {
      year: { type: Number },
      month: { type: Number },
      day: { type: Number },
      hours: { type: Number },
      minutes: { type: Number },
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Post", postsSchema);
