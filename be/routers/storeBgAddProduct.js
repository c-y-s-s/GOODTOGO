const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");



router.post("/newproduct", async (req, res, next) => {
    console.log(req.body);
    //*存入資料庫
    let [result] = await connection.execute(
      `INSERT INTO products (store_id,name, description, amount, price,start_time,due_time, created_at,valid) 
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        req.body.storeId,
        req.body.productName,
        req.body.productDescription,
        req.body.amountOfGoods,
        req.body.commodityPrice,
        req.body.salesTimeStart,
        req.body.salesTimeEnd,
        req.body.createdAt,
        "1",
      ]
    );
    console.log(result);
    res.json({ message: "ok" });
  });

module.exports = router;
