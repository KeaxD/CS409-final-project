const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test api works" });
});

module.exports = router;
