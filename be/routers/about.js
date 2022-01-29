const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/about",  (req, res, next) => {
  res.json({msg:這是關於我們頁尚未實作});
});


module.exports = router;