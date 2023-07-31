const express = require("express");
const { signup, login } = require("../controllers/controller");
const router = express.Router();

router.post("/sign-up", signup);

router.post("/login", login);

module.exports = router;
