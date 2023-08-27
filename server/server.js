require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
const cors = require("cors");
require("./config/passport")(passport);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);

    const app = express();
    app.use(express.json());
    app.use(cors());

    //Auth routes: people login and sign up here ; Accessible by everyone
    app.use("/api/auth", routes.auth);

    //Post Routes: where users with token can create,
    //edit their own post and view other posts
    app.use(
      "/posts",
      passport.authenticate("jwt", { session: false }),
      routes.posts
    );

    //Update Account route: Users update their account info
    app.use(
      "/account",
      passport.authenticate("jwt", { session: false }),
      routes.account
    );

    //setup ROUTE for admins: create admin user, view all posts and users
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
