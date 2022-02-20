const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// 指定 commmit
router.get("/:commitId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    // "SELECT a.name ,a.img,a.price,a.amount,a.description,b.star FROM products AS a JOIN products_comment AS b on b.products_id = a.id WHERE a.id =?",
    `SELECT a.id,
    a.comment,
    a.star,
    a.create_time,
    b.headshots,
    b.name FROM products_comment AS a 
    JOIN users AS b on a.user_id = b.id 
    WHERE a.products_id = ?`,
    // "SELECT * FROM products_comment WHERE products_id = ?",
    [req.params.commitId]
  );
  // console.log(data);
  res.json(data);
});
// -------- 撈出全部商品結束 --------

module.exports = router;
