const router = require('express').Router();
const Product = require('../models/product-model');
const User = require('../models/user-model');

router.get("/",(req,res)=>{
  res.send(['You Are Admin', "https://www.mongodb.com/", "https://disqus.com/"]);
});

module.exports = router;
