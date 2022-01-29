const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/map",  (req, res, next) => {
  res.json({msg:這是地圖頁});
});


module.exports = router;