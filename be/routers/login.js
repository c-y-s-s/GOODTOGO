const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/login",  (req, res, next) => {
  res.json({msg:這是登入頁尚未實作});
});


module.exports = router;