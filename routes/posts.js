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
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

//Creating one post
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.userPostId) {
    res.status(400);
    res.json({ sucess: false, error: "Missing title or content" });
  }
  const post = new Post({
    name: req.body.name,
    userPostId: req.body.userPostId,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one post
router.patch("/:id", getPost, async (req, res) => {
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
router.delete("/:id", getPost, async (req, res) => {
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

module.exports = router;
