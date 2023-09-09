const express = require("express");
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

router = express.Router();

router.route("/").post(createUser).get(getAllUsers);

router.route("/:id").delete(deleteUser).patch(updateUser);
module.exports = router;
