const express = require("express");
const router = express.Router();
// 連接資料庫
const connection = require("../utils/db");
// -------- 商品排序 數量 高到低 --------
// /api/member/profile (get)
router.get("/productsamountdesc", async (req, res, next) => {
  let [productsData] = await connection.execute(
    "SELECT * FROM products WHERE store_id = ?",
    [req.session.member.id]
  );
  console.log("db_stores id: ", req.session.member.id);
  console.log("取得 stores: ", productsData);

  let page = req.query.page || 1;
  console.log("目前所在頁數：", page);

  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM products WHERE store_id=?",
    [req.session.member.id]
  );

  console.log("總筆數：", total);
  total = total[0].total; // total = 6

  // 計算總共應該要有幾頁
  const perPage = 3;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);
  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;
  // 取得資料
  let [data] = await connection.execute(
    "SELECT * FROM products WHERE store_id=? ORDER BY amount DESC LIMIT ? OFFSET ?",
    [req.session.member.id, perPage, offset]
  );
  console.log("目前店家id", req.session.member.id);
  console.log("目前一頁有幾筆", perPage);
  console.log("offsetoffsetoffset3", offset);
  // -------- 整理分頁資訊回傳的資料 --------
  //全部商家數，一頁幾筆資料，在第幾頁，最後一頁
  let pagination = { total, perPage, page, lastPage };

  console.log("data", data);

  res.json([data, productsData, pagination]);
});

module.exports = router;