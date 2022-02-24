const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  // 取得目前在第幾頁
  // 如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  console.log("目前在第幾頁", page);
  // TODO: 商家總筆數
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stores WHERE valid=1"
  );
  console.log("全部筆數", total); // [ { total: 76 } ]
  total = total[0].total; // total = 15
  // 計算總共應該要有幾頁
  const perPage = 16;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);
  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;

  // TODO: 取得有分類的商家資料，並設定每頁幾個，第n頁的位移

  let [data] = await connection.execute(
    "SELECT * FROM stores_category JOIN stores ON stores_category.id = stores.stores_category_id LIMIT ? OFFSET?",
    [perPage, offset]
  );

  //--------尚未設分頁的資料
  // let [data, fields] = await connection.execute(
  //   "SELECT * FROM stores JOIN stores_category ON stores.stores_category_id = stores_category.id"
  // );
  // console.log(data);
  //TODO: 取得商家分類
  let [category] = await connection.execute("SELECT * FROM stores_category");
  let pagination = { total, perPage, page, lastPage };

  //console.log("category", category);
  //console.log("pagination", pagination);
  //console.log("data", data);
  res.json([data, category, pagination]);
});


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
