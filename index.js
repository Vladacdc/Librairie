const  express = require('express');
const authRoutes= require('./routes/auth-routes.js');
const passportSetup = require('./config/passport-setup');

var app = express();

app.set('view engine', 'ejs');

app.use('/auth',authRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
