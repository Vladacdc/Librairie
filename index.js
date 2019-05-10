const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

var app = express();

//setup view engine
app.set('view engine', 'ejs');

//connect to db
mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true
}, () => {
  console.log('Connected to db');
});

//set up routes
app.use('/auth', authRoutes);

//root route
app.get('/', (req, res) => {
  res.render('index');
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
