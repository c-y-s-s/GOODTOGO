const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

//取表的最大id 
router.get("/maxorderid", async (req, res, next) => {
  let [data, fields] = await connection.execute(
  `SELECT  MAX(id) AS maxId FROM user_order`
  );
  res.json(data[0].maxId);
});

// /api/products
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    `
  SELECT a.*,b.name AS product_name,b.price ,b.img
FROM shopping_cart AS  a
JOIN products AS b ON a.products_id = b.id
WHERE a.store_id = ?`,
    [req.params.storeId]
  );
  res.json(data);
});

// 寫入訂單資訊
router.post("/orderdetail", async (req, res, next) => {
  let [result] = await connection.execute(
    "INSERT INTO user_order (id,user_id, status_id, store_id,payment_method, order_time , order_number) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.id,
      req.body.userId,
      req.body.storeId,
      req.body.statusId,
      req.body.paymentMethod,
      req.body.orderTime,
      req.body.order_number,
    ]
  );
    let [DeteleResult] = await connection.execute(
      `DELETE FROM shopping_cart
       WHERE user_id = ? AND store_id = ?;`,
      [req.body.userId, req.body.storeId]
    );
  console.log(req.body);
  res.json({ msg: "ok" });
});

// 寫入商品資訊
router.post("/userorderdetail", async (req, res, next) => {
  req.body.forEach(async  (item) => {
    let [result] = await connection.execute(
      "INSERT INTO user_order_detail (order_id,product_id, amount) VALUES (?,?,?)",
      [item.orderId, item.productsId, item.amount]
    );
  });
  console.log(req.body);
  res.json({ msg: "Checkout Products INSERT ok" });
});
module.exports = router;
