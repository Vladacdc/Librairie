const router = require('express').Router();
const Product = require('../models/product-model');

router.get("/", (req, res) => {
  Product.find((err, products) => {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < products.length; i += chunkSize) {
      productChunks.push(products.slice(i, i + chunkSize));
    }
    res.render("shop", {
      user: req.user,
      home: "",
      shop: "active",
      products: productChunks
    });
  });
});

module.exports = router;
