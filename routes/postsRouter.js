const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("../controllers/postsController");

router = express.Router();

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").delete(deletePost).patch(updatePost);
module.exports = router;
