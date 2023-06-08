const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");

const router = express.Router();

//Getting all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one post
router.get("/:id", (req, res) => {
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
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.content) {
    return res
      .status(400)
      .json({ success: false, error: "Missing title or content" });
  }
  const post = new Post({
    name: req.body.name,
    content: req.body.content,
    author: req.user._id,
  });
  try {
    const newPost = await post.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

//Updating one post
router.patch("/:id", getPost, checkIdentity, async (req, res) => {
  if (req.body.name != null) {
    res.post.name = req.body.name;
  }
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  try {
    const updatedPost = await res.post.save();
    res.json({ message: "Content was updated!", NewPost: updatedPost });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one post
router.delete("/:id", getPost, checkIdentity, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: `${req.user.name} deleted post: ${res.post.name}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all posts
router.delete("/", async (req, res) => {
  try {
    await Post.deleteMany(); // Delete all documents in the "posts" collection
    res.json({ message: "All posts have been deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  try {
    post = await Post.findById(req.params.id).populate("author");
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    req.post = post;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function checkIdentity(req, res, next) {
  try {
    if (
      req.post.author._id != req.user._id.toString() &&
      req.user.role != "admin"
    ) {
      return res.status(401).json({
        error: "Unauthorized",
        message: `The User ${req.user.name} cannot access this`,
      });
    } else {
      res.post = post;
      next(); // Call next to pass control to the next middleware or route handler
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
