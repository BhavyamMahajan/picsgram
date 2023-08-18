const express = require("express");

const {
  signup,
  login,
  logginedUser,
  createPost,
  editUserDetails,
  getUserDetails,
  getUserProfile,
  getProfileImg,
  getFeeds,
  likePost,
  addComments,
  getSearchedUser,
} = require("../controllers/controller");

const validateToken = require("../middleware/userTokenHandler");

const router = express.Router();

router.post("/sign-up", signup);

router.post("/login", login);

router.post("/user", validateToken, logginedUser);

router.post("/create-post", createPost);
router.get("/edit/:userid", getUserDetails);
router.post("/edit", editUserDetails);
router.get("/user-profile/:user", getUserProfile);
router.get("/profile-img/:userid", getProfileImg);
router.get("/feeds/:userid", getFeeds);
router.post("/update-likes", likePost);
router.post("/add-comment", addComments);
router.get("/search/:key", getSearchedUser);

module.exports = router;
