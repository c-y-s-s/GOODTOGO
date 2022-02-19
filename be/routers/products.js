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
        if (req.query.storeid) {
       
        }
        })
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
      // "SELECT * FROM products WHERE store_id = ?",

  let [products, fields] = await connection.execute(
    `SELECT * FROM products WHERE store_id = ?;`,
    [req.params.storeId]
  );

  let productIds = products.map((d) => {
    return d.id;
  });
 
  let [comments] = await connection.execute(
    `SELECT count(id) AS count, products_id, round(AVG(star),1) AS score FROM products_comment WHERE products_id IN (${productIds.join(",")}) GROUP BY products_id;`
  );
  // res.json(comments);
  products.map(p => {
    let comment = comments.find(c => c.products_id === p.id);
    if(comment) {
      p.score = comment.score;
    } else {
      p.score = null;
    }

  });

  res.json(products);
});

// -------- 撈出對應商家 ID 商品結束 --------

module.exports = router;
