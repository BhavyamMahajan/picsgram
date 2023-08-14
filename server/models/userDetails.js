const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: String,
  name: String,
  bio: String,
  profileImg: String,
  posts: [String],
});

module.exports = mongoose.model("userdetails", user);
