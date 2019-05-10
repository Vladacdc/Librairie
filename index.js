const express = require("express");
const authRoutes = require("./routes/auth-routes");
/*eslint-disable-next-line no-unused-vars*/
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require('passport');

var app = express();

//setup view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to db
mongoose.connect(
  keys.mongodb.dbURI,
  {
    useNewUrlParser: true
  },
  () => {
    console.log("Connected to db");
  }
);

//set up routes
app.use("/auth", authRoutes);

//root route
app.get("/", (req, res) => {
if(req.user){
  res.render("index",{username: req.user.username});
}else{
  res.render("index");
}


});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
