const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// --------- 撈出全部商品 --------
// /api/products
router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM products");
  // console.log(data);
  res.json(data);
});
// -------- 撈出全部商品結束 --------

// -------- 撈出對應商家 ID 商品 --------
router.get("/:storeId", async (req, res, next) => {
  // let [data, fields] = await connection.execute(
  //   "SELECT COUNT(*) AS total FROM products WHERE store_id = ? "
  // );
  // console.log(data);
  // res.json(data);
  // req.params.storeId
  //取出網址上的 stockId 確認
  // console.log(req.params.storeId);
  //撈資料
  let [data, fields] = await connection.execute(
    "SELECT * FROM products WHERE store_id = ?",
    [req.params.storeId]
  );
  res.json(data);
});

// -------- 撈出對應商家 ID 商品結束 --------

module.exports = router;
