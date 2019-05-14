const router = require('express').Router();
const Product = require('../models/product-model');

router.get("/", (req, res) => {
  Product.find((err, products) => {    
    res.render("shop", {
      user: req.user,
      home: "",
      shop: "active",
      products: products
    });
  });
});

module.exports = router;
