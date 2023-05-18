const express = require("express");
const router = express.Router();
const Post = require("../models/post");

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
  res.send(req.params.id);
});

//Creating one post
router.post("/", async (req, res) => {
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
router.patch("/:id", (req, res) => {});

//Delete one post
router.delete("/:id", (req, res) => {});

module.exports = router;
