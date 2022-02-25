// 引入 express
const express = require("express");
// 引入 express router
const router = express.Router();
const connection = require("../utils/db");

// 使用者所加入購物車所有商品店家(不重複)
router.get("/shoppingstoredata/:userid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT DISTINCT store_id ,
    b.name AS store_name,
    c.category 
    FROM shopping_cart AS a
    JOIN stores AS b ON a.store_id = b.id
    JOIN products_category AS c ON b.stores_category_id = c.id
    WHERE user_id = ?`,
    [req.params.userid]
  );

  res.json(data);
});

// 使用者所加入購物車所有商品
router.get("/shoppingcar/:userId/:storeid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT 
    a.*,
    b.name,
    c.category,
    d.name AS product_name,
    d.img,
    d.price
    FROM shopping_cart AS a 
    JOIN stores AS b ON b.id = a.store_id
    JOIN stores_category AS c ON c.id = b.stores_category_id
     JOIN products AS d ON a.products_id = d.id
    WHERE a.user_id = ? AND a.store_id = ?`,
    [req.params.userId, req.params.storeid]
  );

  res.json(data);
});

// 使用者所加入購物車所有商品
router.get("/shoppingcar/:userId/", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT 
    a.*,
    b.name,
    c.category,
    d.name AS product_name,
    d.img
    FROM shopping_cart AS a 
    JOIN stores AS b ON b.id = a.store_id
    JOIN stores_category AS c ON c.id = b.stores_category_id
     JOIN products AS d ON a.products_id = d.id
    WHERE user_id = ?`,
    [req.params.userId]
  );

  res.json(data);
});

// /api/auth/register 這邊是因為先寫前端所以網址就要設定前端所設定的
router.post("/shoppingcar", async (req, res, next) => {
  //req.params 變數是在網址上
  //req.query ?xxx
  // body(form post) post用
  console.log(req.body);
  console.log(req.body.amount !== 0);
  if (req.body.products_id === "" || req.body.amount <= 0) {
    return res.status(400).json({ code: "30001", msg: "ok" });
  }

  let [result] = await connection.execute(
    "INSERT INTO shopping_cart (store_id,user_id,products_id,amount)VALUES(?,?,?,?)",
    [req.body.store_id, req.body.user_id, req.body.products_id, req.body.amount]
  );

  res.json({ msg: "加入購物車成功" });
});

module.exports = router;
