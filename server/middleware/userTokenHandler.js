const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).json({ error: "token not valid" });

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: "token not valid" });
    }
    req.user = decoded.user;
    next();
  });
});

module.exports = validateToken;
