const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
} = require("../controllers/usersController");

router = express.Router();

router.route("/").post(createUser);

router.route("/:id").patch(updateUser).get(getUser);
module.exports = router;
