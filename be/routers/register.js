const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/register",  (req, res, next) => {
  res.json({msg:這是註冊頁尚未實作});
});


module.exports = router;