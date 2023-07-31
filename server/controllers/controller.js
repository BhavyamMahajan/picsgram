const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userCred = require("../models/signup");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All Feilds are mandatory" });
  }

  const userNameAvailable = await userCred.findOne({ username });
  const emailRegistered = await userCred.findOne({ email });

  if (userNameAvailable || emailRegistered) {
    return res
      .status(400)
      .send("User Already exist with the same username or email");
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
      { expiresIn: "2h" }
    );
    res.status(200).json({ accessToken, username });
  } else res.status(400).json({ error: "email or password is not valid" });
});

module.exports = { signup, login };
