const mongoose = require("mongoose");

const postDetail = mongoose.Schema(
  {
    username: String,
    imageUrl: [],
    caption: String,
    likes: Number,
    comments: [{ username: String, comment: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", postDetail);
