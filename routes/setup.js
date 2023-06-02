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
router.get("/", getUser, async (req, res) => {
  if (req.user.role != "admin") {
    return res.status(401).json({ message: "Access denied: Unauthorized" });
  }
  try {
    const posts = await Post.find();
    const users = await User.find();
    res.json({
      message: `Welcome ${req.user.name} !`,
      posts: posts,
      users: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.user._id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
