const express = require("express");
const User = require("../models/user");

const router = express.Router();

//account/
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      return res.json({ message: `Welcome ${user.name}!` });
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

module.exports = router;
