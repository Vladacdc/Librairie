const passport = require('passport');
const googleAuth = require('passport-google-oauth20');
const keys = require('./keys.js');

passport.use(
  new googleAuth({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  () => {

  })
);
