const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/product",  (req, res, next) => {
  res.json({msg:這是商品頁尚未實作});
});


module.exports = router;