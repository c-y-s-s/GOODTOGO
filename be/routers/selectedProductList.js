const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// --------- 撈出全部商品類別 --------
// /api/selectedProductList
router.get("/", async (req, res, next) => {
  let [data] = await connection.execute(
    "SELECT * FROM products_category"
  );
  console.log(data);
  res.json(data);
});
// -------- 撈出全部商品類別 --------

module.exports = router;
