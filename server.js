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

    //Post Routes: where users with token can create,
    //edit their own post and view other posts
    app.use(
      "/posts",
      passport.authenticate("jwt", { session: false }),
      routes.posts
    );

    //Auth routes: people login and sign up here ; Accessible by everyone
    app.use("/api/auth", routes.auth);

    //setup ROUTE for admin
    app.use(
      "/api/setup",
      passport.authenticate("jwt", { session: false }),
      routes.setup
    );

    app.listen("8080", () => console.log("Server is listening on port 8080"));
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });
