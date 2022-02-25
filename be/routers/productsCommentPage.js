const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// --------- 撈出全部商品評論 --------
// /api/products
router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM products_comment"
  );
  // console.log(data);
  res.json(data);
});
// -------- 撈出全部商品評論結束 --------

// -------- 撈出對應商家 ID 商品評論 --------
router.get("/:storeId", async (req, res, next) => {
  let page = req.query.page || 1;
  console.log("aaaa", page);
  //計算資料總筆數
  let [total] = await connection.execute(
    "SELECT  COUNT(*) AS total FROM products_comment AS a JOIN users AS b ON  a.user_id = b.id WHERE store_id = ?",
    [req.params.storeId]
  );
  total = total[0].total; //13
  //計算總共要有幾頁
  const perPage = 8;
  const lastPage = Math.ceil(total / perPage);
  // 計算offsSELECT 
  let offset = (page-1) * perPage;
  let [data] = await connection.execute(
    `SELECT a.* ,
    b.name,
    b.headshots,
    c.img,
    c.name AS products_name
    FROM products_comment AS a 
    JOIN users AS b ON  a.user_id = b.id 
    JOIN products AS c ON a.products_id = c.id
    WHERE a.store_id = ?
    ORDER BY create_time DESC
    LIMIT ? 
    OFFSET ?`,
    [req.params.storeId, perPage, offset]
  );
    //response
res.json(
  {pagination:{total,perPage,page,lastPage},
data});
//   let [data, fields] = await connection.execute(
//     "SELECT a.* ,b.name FROM products_comment AS a JOIN users AS b ON  a.user_id = b.id WHERE store_id = ? ",
//     [req.params.storeId]
//   );

//   res.json(data);
});

// -------- 撈出對應商家 ID 商品評論結束 --------

module.exports = router;
