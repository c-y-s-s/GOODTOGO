const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

//有分頁的店家列表api: api/stores/
router.get("/", async (req, res, next) => {
  // -------- 取得目前在第幾頁 --------
  // 如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  console.log("目前在第幾頁", page);
  // -------- 商家總筆數 --------
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stores WHERE valid=1"
  );
  // console.log("全部筆數", total); // [ { total: 76 } ]
  total = total[0].total;
  // 計算總共應該要有幾頁
  const perPage = 16;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);
  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;

  // -------- 取得有分類的商家資料，並設定每頁幾個，第n頁的位移 --------
  let [data] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category
    FROM stores AS a 
    JOIN stores_category AS b ON a.stores_category_id = b.id
    WHERE a.valid = 1 ORDER BY a.id LIMIT ? OFFSET ?`,
    [perPage, offset]
  );
  // -------- 愛心計算 --------
  // 取得 -> 所有店 store_id 各自愛心數量 likeTotal
  let [storeLikeCount] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id;`
  );

  console.log("喜愛店家們 的 愛心計算 storeLikeCount: ", storeLikeCount);

  // -------- 取得商家分類 --------
  let [category] = await connection.execute("SELECT * FROM stores_category");

  // -------- 整理分頁資訊回傳的資料 --------
  //全部商家數，一頁幾筆資料，在第幾頁，最後一頁
  let pagination = { total, perPage, page, lastPage };

  //console.log("category", category);
  //console.log("pagination", pagination);
  console.log("data", data);
  // console.log(mostCommentedStores);

  //回傳：有分頁的商家列表，商家種類，分頁資訊，收藏愛心
  res.json([data, category, pagination, storeLikeCount]);
});

// -------- 撈出對應商家 ID 詳細資訊 --------
router.get("/:storeId", async (req, res, next) => {
  let [data, fields] = await connection.execute(
    "SELECT * FROM stores WHERE id = ?",
    [req.params.storeId]
  );

  res.json(data);
});
// ------- 結束 --------

module.exports = router;
