require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect("mongodb://mongo:27017/someRandomDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);

    const app = express();
    app.use(express.json());

    app.use("/posts", routes.posts);
    app.use(
      "/api/login",
      passport.authenticate("jwt", { session: false }),
      routes.api
    );
    app.use("/api/auth", routes.auth);

    app.listen("8080", () => console.log("Server is listening on port 8080"));
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });
