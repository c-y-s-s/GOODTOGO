const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  let keyword = req.query;
  let [searchedStores] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category, c.star
    FROM stores AS a 
    JOIN stores_category AS b ON a.stores_category_id = b.id
    JOIN products_comment AS c ON a.id = c.store_id 
    WHERE a.name LIKE '%?%' `,
    [keyword]
  );
  console.log(searchedStores);
  res.json([searchedStores]);
});

module.exports = router;
