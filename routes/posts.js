const express = require("express");
const router = express.Router();

//Getting all posts
router.get("/", (req, res) => {
  res.send("Hello");
});

//Getting one post
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

//Creating one post
router.post("/", (req, res) => {});

//Updating one post
router.patch("/:id", (req, res) => {});

//Delete one post
router.delete("/:id", (req, res) => {});

module.exports = router;
