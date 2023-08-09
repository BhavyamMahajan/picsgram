const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const addPost = require("../models/posts");
const userCred = require("../models/signup");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All Feilds are mandatory" });
  }

  const userNameAvailable = await userCred.findOne({ username });
  const emailRegistered = await userCred.findOne({ email });

  if (emailRegistered)
    return res.status(400).json({ error: "Email Already registered" });
  if (userNameAvailable) {
    return res.status(400).json({ error: "username not available" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userCred.create({
    username,
    name,
    email,
    password: hashedPassword,
    pass: password,
  });
  if (user) res.status(200).send("Registered Successfully");
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are mandatory");
  }

  const user = await userCred.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          username: user.username,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "6h" }
    );
    res.status(200).json({ accessToken, username });
  } else res.status(400).json({ error: "email or password is not valid" });
});

const logginedUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json({ error: "token not valid" });

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: "token not valid" });
    }
    if (decoded.user.username === username) {
      return res.status(200).json({ user: decoded.user });
    } else return res.status(400).json({ error: "token not valid" });
  });
});

const createPost = asyncHandler(async (req, res) => {
  const { username, imageUrl, caption } = req.body;
  let likes = 0,
    comments = [];
  const post = await addPost.create({
    username,
    imageUrl,
    caption,
    likes,
    comments,
  });
});

module.exports = { signup, login, logginedUser, createPost };
