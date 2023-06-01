const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./config");

const passport = require("passport");
const User = require("../models/user");

module.exports = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
