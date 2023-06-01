const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { route } = require("./posts");
const config = require("../config/config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Delete one user
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/signup", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    res.json({ success: false, message: "Email and Password are required" });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Check if the email already exists
    User.findOne({ email: newUser.email }).then((existingUser) => {
      if (existingUser) {
        // Email already exists, send an error response
        res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      } else {
        newUser
          .save()
          .then(() => {
            res.json({ success: true, message: "User Created", user: newUser });
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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const tokenObj = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObj, config.secret);
      res.send({ success: true, token: "JWT" + token });
    } else {
      res.status(401).send({ success: false, message: "Wrong Password" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

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
