const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");

const router = express.Router();

//Creating admin user
router.post("/admin", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.json({ success: false, message: "Email and Password are required" });
  } else {
    const newAdminUser = new User({
      role: "admin",
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    User.findOne({ email: newAdminUser.email }).then((existingUser) => {
      if (existingUser) {
        // Email already exists, send an error response
        res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      } else {
        newAdminUser
          .save()
          .then(() => {
            res.json({
              success: true,
              message: "User Created",
              user: newAdminUser,
            });
          })
          .catch(() => {
            res
              .status(500)
              .json({ success: false, message: "Failed to create User" });
          });
      }
    });
  }
});

//Getting all posts and users
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    const users = await User.find();
    res.json({ posts: posts, users: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one post
router.get("/post/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("author")
    .then(function (post) {
      if (post) {
        res.json(post);
      } else {
        res.status(404);
        res.json({ error: "Post doesn't exist" });
      }
    });
});

//Creating one post
router.post("/post/", async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    res.json({ sucess: false, error: "Missing title or content" });
  }
  const post = new Post({
    name: req.body.name,
    content: req.body.content,
    author: req.user._id,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one post
router.patch("/post/:id", getPost, async (req, res) => {
  if (req.body.name != null) {
    res.post.name = req.body.name;
  }
  if (req.body.userPostId != null) {
    res.post.userPostId = req.body.userPostId;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one post
router.delete("/post/:id", getPost, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: "Deleted Post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
