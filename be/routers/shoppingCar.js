// 引入 express
const express = require("express");
// 引入 express router
const router = express.Router();
const connection = require("../utils/db");



router.post("/shoppingcartotoaldelete", async (req, res, next) => {
  console.log(req.body);
  // TODO: 寫進資料庫
  let [result] = await connection.execute(
    `DELETE FROM shopping_cart WHERE id = ? `,
    [req.body.id]
  );
  console.log(result);
  res.json({ msg: "刪除成功" });
});



router.post("/shoppingcartotoal", async (req, res, next) => {
  console.log(req.body);
  // TODO: 寫進資料庫
  let [result] = await connection.execute(
    `UPDATE shopping_cart SET amount=? WHERE id = ?;`,
    [req.body.amount,req.body.id]
  );
  console.log(result);
  res.json({ msg: "ok" });
});

// 使用者所加入購物車所有商品店家(不重複)
router.get("/shoppingstoredata/:userid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `SELECT shopping_cart.store_id,stores.name AS store_name,products_category.category,SUM(shopping_cart.amount*products.price)AS total
FROM shopping_cart
JOIN products ON products.id=shopping_cart.products_id
JOIN stores ON shopping_cart.store_id = stores.id
JOIN products_category ON products_category.id=stores.stores_category_id
WHERE user_id =?
GROUP BY store_id`,
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
    d.price,
    d.amount AS sale_amount
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
