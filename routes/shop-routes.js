const router = require('express').Router();

router.get("/",(req,res)=>{
  res.render("shop", {user: req.user});
});

module.exports = router;
