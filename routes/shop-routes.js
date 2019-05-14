const router = require('express').Router();
const Product = require('../models/product-model');
const Cart = require('../models/cart-model');

router.get("/", (req, res) => {
  Product.find((err, products) => {
    res.render("shop", {
      user: req.user,
      shop: "active",
      products: products
    });
  });
});

router.get("/add-to-cart/:id", (req, res) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, (err, product) => {
       if (err) {
           return res.redirect('/shop');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/shop');
    });
});

router.get("/shopping-cart", (req, res) => {
   if (!req.session.cart) {
       return res.render("shopping-cart", {products: null});
   }
    var cart = new Cart(req.session.cart);
    res.render("shopping-cart", {products: cart.generateArray(), user: req.user, totalPrice: cart.totalPrice});
});

module.exports = router;
