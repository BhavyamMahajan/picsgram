const mongoose = require("mongoose");

const singUp = mongoose.Schema(
  {
    email: String,
    name: String,
    username: String,
    password: String,
    pass: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("userCredentials", singUp);
