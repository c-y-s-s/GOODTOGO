const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/home",  (req, res, next) => {
  res.json({msg:這是首頁尚未實作});
});


module.exports = router;