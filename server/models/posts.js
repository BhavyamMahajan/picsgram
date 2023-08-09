const mongoose = require("mongoose");

const postDetail = mongoose.Schema(
  {
    username: String,
    imageUrl: String,
    caption: String,
    likes: Number,
    comments: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("posts", postDetail);
