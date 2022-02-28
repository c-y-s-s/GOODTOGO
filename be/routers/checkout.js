const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

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

router.post("/orderdetail", async (req, res, next) => {
  let [result] = await connection.execute(
    "INSERT INTO user_order (user_id, status_id, store_id, order_time , order_number) VALUES (?,?,?,?,?)",
    [
      req.body.userId,
      req.body.storeId,
      req.body.statusId,
      req.body.orderTime,
      req.body.order_number,
    ]
  );
  console.log(req.body);
  res.json({ msg: "ok" });
});

module.exports = router;
