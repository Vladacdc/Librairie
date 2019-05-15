const router = require('express').Router();
const Product = require('../models/product-model');
const Cart = require('../models/cart-model');

router.get("/(:mode)?", (req, res) => {
  var mode = req.params.mode? req.params.mode: 'default';
  var sort={};
  if(mode=='priceUp'){
    sort={price:1};
  }else if (mode=='priceDown') {
    sort={price:-1};
  }

  var pageNum = req.query.pageNum ? req.query.pageNum : 1;
  Product.paginate({}, {
    page: pageNum,
    limit: 2,
    sort: sort
  }).then((result) => {
    res.render("shop", {
      user: req.user,
      shop: "active",
      products: result.docs,
      pages: result.pages,
      page: result.page,
      fullUrl: req.originalUrl.split('?')[0]
    });
  });
});

router.get("/add-to-cart/:id", (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('back');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('back');
  });
});

router.get("/shopping-cart", (req, res) => {
  if (!req.session.cart) {
    return res.render("shopping-cart", {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render("shopping-cart", {
    products: cart.generateArray(),
    user: req.user,
    totalPrice: cart.totalPrice
  });
});

router.get("/remove-all", (req, res) => {
  req.session.cart = new Cart({});
  res.redirect("/shop/shopping-cart");
});

router.get("/remove/:id", (req, res) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/shop/shopping-cart");
});

router.post("/setQty/:id", (req, res) => {
  var productId = req.params.id;
  var newQty = req.body.newQty;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.setQty(newQty, productId);
  // console.log(cart);
  req.session.cart = cart;

  res.redirect("/shop/shopping-cart");
});

router.get("/product/:id", (req, res) => {
  var productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/shop');
    }
    res.render("product", {
      product: product,
      user: req.user
    });
  });
});

module.exports = router;
