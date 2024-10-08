const mongoose = require("mongoose");

const singUp = mongoose.Schema(
  {
    email: String,
    name: String,
    username: String,
    password: String,
    pass: String,
    bio: String,
    profileImg: String,
    postsLiked: [String],
    isVerified: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("userinfo", singUp);
