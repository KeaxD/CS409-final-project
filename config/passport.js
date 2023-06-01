const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./config");

const passport = require("passport");
const User = require("../models/user");

module.exports = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload._id });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    })
  );
};
