const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const allPosts = require("../models/posts");
const userInfo = require("../models/signup");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All Feilds are mandatory" });
  }

  const userNameAvailable = await userInfo.findOne({ username });
  const emailRegistered = await userInfo.findOne({ email });

  if (emailRegistered)
    return res.status(400).json({ error: "Email Already registered" });
  if (userNameAvailable) {
    return res.status(400).json({ error: "username not available" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userInfo.create({
    username,
    name,
    email,
    password: hashedPassword,
    pass: password,
    bio: "",
    profileImg: "",
    isVerified: false,
  });

  if (user) return res.status(200).json({ message: "success" });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("All fields are mandatory");
  }

  const user = await userInfo.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          name: user.name,
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
  const user = await userInfo.findOne({ username });

  if (req.user.username === username) {
    return res.status(200);
  }
  res.status(400).json({ error: "token not valid" });
  // const { authorization } = req.headers;
  // if (!authorization) return res.status(400).json({ error: "token not valid" });

  // const token = authorization.split(" ")[1];

  // jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
  //   if (err) {
  //     return res.status(400).json({ error: "token not valid" });
  //   }
  //   if (decoded.user.username === username) {
  //     return res.status(200).json({ user: decoded.user });
  //   } else return res.status(400).json({ error: "token not valid" });
  // });
});

const createPost = asyncHandler(async (req, res) => {
  const { username, imageUrl, caption } = req.body;
  let likes = 0,
    comments = [];
  const post = await allPosts.create({
    username,
    imageUrl,
    caption,
    likes,
    comments,
  });
  if (post) res.status(200).json({ message: "success" });
});

const getUserDetails = asyncHandler(async (req, res) => {
  const username = req.url.split("/")[2];
  const user = await userInfo.findOne({ username });
  const data = {
    username: user.username,
    name: user.name,
    bio: user.bio,
    profileImg: user.profileImg,
  };
  res.json(data);
});

const editUserDetails = asyncHandler(async (req, res) => {
  const { username, name, bio, profileImg } = req.body;

  const user = await userInfo.updateOne(
    { username },
    { name, bio, profileImg }
  );

  res.status(200).json({ message: "success" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const username = req.url.split("/")[2];

  const user = await userInfo.findOne({ username });
  const userPosts = await allPosts.find({ username });

  const data = {
    name: user.name,
    bio: user.bio,
    profileImg: user.profileImg,
    posts: userPosts,
    isVerified: user.isVerified,
  };
  res.json(data);
});

const getProfileImg = asyncHandler(async (req, res) => {
  const username = req.url.split("/")[2];
  const user = await userInfo.findOne({ username });
  if (user) {
    res.status(200).json({ profileImg: user.profileImg });
  }
});

const getFeeds = asyncHandler(async (req, res) => {
  const username = req.url.split("/")[2];

  const posts = await allPosts.find({});

  const data = posts.map(async (post, i) => {
    const user = await userInfo.findOne({ username: post.username });
    return { profileUrl: user.profileImg, post };
  });
  const result = (await Promise.allSettled(data)).map(
    ({ status, value }) => value
  );

  const curr_user = await userInfo.findOne({ username });

  res
    .status(200)
    .json({ posts: result.reverse(), postsLiked: curr_user.postsLiked });
});

const likePost = asyncHandler(async (req, res) => {
  const { username, postId } = req.body;

  const user = await userInfo.findOne({ username });
  const postDetails = await allPosts.findOne({ _id: postId });

  let newPostsLiked = user.postsLiked,
    newTotalLikes = postDetails.likes;

  const index = user.postsLiked.indexOf(postId);

  if (index === -1) {
    newPostsLiked.push(postId);
    ++newTotalLikes;
  } else {
    newPostsLiked.splice(index, 1);
    if (newTotalLikes) --newTotalLikes;
  }
  await userInfo.updateOne(
    { username },
    {
      postsLiked: newPostsLiked,
    }
  );
  await allPosts.updateOne(
    { _id: postId },
    {
      likes: newTotalLikes,
    }
  );
  res.status(200).json({ message: "success" });
});

const addComments = asyncHandler(async (req, res) => {
  const { username, comment, postId } = req.body;
  const post = await allPosts.findOne({ _id: postId });

  const postComments = post.comments;
  postComments.push({ username, comment });

  await allPosts.updateOne(
    { _id: postId },
    {
      comments: postComments,
    }
  );
  res.status(200).json({ message: "success" });
});

const getSearchedUser = asyncHandler(async (req, res) => {
  console.log(req.url);
  const key = req.url.split("/")[2];

  const users = await userInfo.find({ username: { $regex: key } });

  res.status(200).json(users);
});

module.exports = {
  signup,
  login,
  logginedUser,
  createPost,
  getUserDetails,
  editUserDetails,
  getUserProfile,
  getProfileImg,
  getFeeds,
  likePost,
  addComments,
  getSearchedUser,
};
