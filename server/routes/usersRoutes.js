const express = require("express");
const {
  signup,
  login,
  logginedUser,
  createPost,
} = require("../controllers/controller");
const router = express.Router();

router.post("/sign-up", signup);

router.post("/login", login);

router.post("/user", logginedUser);

router.post("/create-post", createPost);

module.exports = router;
