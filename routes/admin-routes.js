const router = require('express').Router();
const Product = require('../models/product-model');
const User = require('../models/user-model');

router.get("/",(req,res)=>{
  res.send('You Are Admin');
});

module.exports = router;
