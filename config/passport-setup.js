const passport = require('passport');
const googleAuth = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new googleAuth({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id
      }).then((currentUser) => {
        console.log('user is: ' + currentUser);
      }).catch(() => {
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('SYSTEM: new user created' + newUser);
        });
      });
    })
);
