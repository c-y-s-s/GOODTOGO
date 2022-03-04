const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  let [data] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category, c.star
    FROM stores AS a 
    JOIN stores_category AS b ON a.stores_category_id = b.id
    JOIN products_comment AS c ON a.id = c.store_id 
    WHERE a.valid = 1 ORDER BY c.star DESC LIMIT 4`
  );
  console.log("recommStores", data);
  res.json([data]);
});

module.exports = router;
