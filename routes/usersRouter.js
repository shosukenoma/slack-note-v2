const express = require("express");
const { updateUser } = require("../controllers/usersController");
const { login, signup } = require("../controllers/authController");

router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/:id").patch(updateUser);
module.exports = router;
