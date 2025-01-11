const express = require("express");
const register = require("./register");
const login = require("./login");

const router = express.Router();
router.use("/register", register);
router.use("/login", login);

module.exports = router;
