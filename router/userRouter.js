const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/signUp").post(userController.signUp);

router.route("/login").get(userController.login);

module.exports = router;
