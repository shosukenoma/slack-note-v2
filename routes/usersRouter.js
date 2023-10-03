const express = require("express");
const { updateUser } = require("../controllers/usersController");
const { login, register } = require("../controllers/authController");

router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/:id").patch(updateUser);
module.exports = router;
