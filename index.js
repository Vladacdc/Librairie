const express = require("express");
const authRoutes = require("./routes/auth-routes");
/*eslint-disable-next-line no-unused-vars*/
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require('passport');
const path = require('path');
const shopRoutes = require('./routes/shop-routes');
const adminRoutes = require('./routes/admin-routes');


var app = express();

//setup view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session({
  saveUninitialized: true,
  resave: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/mdbootstrap', express.static(path.join(__dirname, 'node_modules/mdbootstrap')));

//connect to db
mongoose.connect(
  keys.mongodb.dbURI, {
    useNewUrlParser: true
  },
  () => {
    console.log("Connected to db");
  }
);

//set up routes
app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/admin", (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.redirect("/");
  } else {
    next();
  }
}, adminRoutes);

//root route
app.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
    home: "active",
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
