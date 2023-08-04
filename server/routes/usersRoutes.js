const express = require("express");
const { signup, login, logginedUser } = require("../controllers/controller");
const router = express.Router();

router.post("/sign-up", signup);

router.post("/login", login);

router.post("/user", logginedUser);
module.exports = router;
