require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://mongo:27017/someRandomDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);

    const app = express();
    app.use(express.json());

    const postsRouter = require("./routes/posts");
    const apiRouter = require("./routes/api");
    app.use("/posts", postsRouter);
    app.use("/api", apiRouter);
    app.listen("8080", () => console.log("Server is listening on port 8080"));
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });
