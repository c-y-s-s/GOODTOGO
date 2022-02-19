const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM stores");
  // console.log(data);
  res.json(data);
});

// -------- 撈出對應商家 ID 詳細資訊 --------
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM stores WHERE id = ?", [
    req.params.storeId,
  ]);
  res.json(data);
});
// ------- 結束 --------

router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM products_comment"
  );
  // console.log(data);
  res.json(data);
});



// -------- 撈出對應商家 ID 詳細資訊 --------
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT a.* , b.category FROM stores AS a JOIN products_category AS b ON b.id = a.stores_category_id WHERE a.id = ?", [
    req.params.storeId,
  ]);
  res.json(data);
});
// ------- 結束 --------

module.exports = router;