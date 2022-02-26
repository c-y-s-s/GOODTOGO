const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");

// 撈指定商家經緯度
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM map WHERE id = ?",
    [req.params.storeId]
  );
  res.json(data);
});


module.exports = router;
