const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Post = require("../models/post");

router.get("/", (req, res) => {
  res.json({ message: "test api works", user: req.user });
});

module.exports = router;
