const express = require("express");
const User = require("../models/user");

const router = express.Router();

//Welcome
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      return res.json(user);
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

router.patch("/update", getUser, async (req, res) => {
  if (req.body.name) {
    res.user.name = req.body.name;
  }
  if (req.body.email) {
    res.user.email = req.body.email;
  }
  if (req.body.password) {
    if (!req.body.oldpassword) {
      return res.json({ message: "Please provide your old password" });
    } else {
      const user = await User.findById(req.user._id);
      const isMatch = await user.comparePassword(req.body.oldpassword);
      if (isMatch) {
        res.user.password = req.body.password;
      } else {
        return res.json({ message: "Your old password is incorrect" });
      }
    }
  }
  try {
    const updatedUser = await res.user.save();
    res.json({
      message: "Your information has been updated!",
      NewInfo: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete one user
router.delete("/:id", async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const deletedUser = await User.findById(req.params.id);
    await deletedUser.deleteOne();
    res.json({ message: `${req.user.name} deleted user: ${deletedUser.name}` });
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
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
