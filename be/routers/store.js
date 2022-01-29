const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/store",  (req, res, next) => {
  res.json({msg:這是商家個人頁尚未實作});
});


module.exports = router;