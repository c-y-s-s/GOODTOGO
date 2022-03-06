const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
require("dotenv").config();
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: "null",
        clientSecret: "null",
        fbGraphVersion: "v3.0",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ facebookId: profile.id }, function (error, user) {
          return done(error, user);
        });
      }
    )
  );
};

passport.use(
  new GoogleStrategy(
    {
      clientID: "null",
      clientSecret: "null",
      callbackURL: "http://localhost:3002/oauth2/redirect/google",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
