const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// 指定id商品
router.get("/:productId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    // "SELECT a.name ,a.img,a.price,a.amount,a.description,b.star FROM products AS a JOIN products_comment AS b on b.products_id = a.id WHERE a.id =?",
    "SELECT * FROM products WHERE id = ?",
    [req.params.productId]
  );
  // console.log(data);
  res.json(data);
});
// -------- 撈出全部商品結束 --------

module.exports = router;