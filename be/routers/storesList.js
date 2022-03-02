// -------- 目前沒有用到 ------ 是從store.js複製過來的
const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  // 取得目前在第幾頁
  // 如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  // console.log("目前在第幾頁", page);
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

  // TODO: 取得有分類的商家資料，並設定每頁幾個跟最後頁
  // let [data] = await connection.execute(
  //   "SELECT * FROM stores_category JOIN stores ON stores_category.id = stores.stores_category_id LIMIT ? OFFSET?",
  //   [perPage, offset]
  // );

  //--------尚未設分頁的資料
  let [data, fields] = await connection.execute(
    "SELECT * FROM stores JOIN stores_category ON stores.stores_category_id = stores_category.id"
  );
  // console.log(data);
  //TODO: 取得商家分類
  let [category] = await connection.execute("SELECT * FROM stores_category");
  let pagination = { total, perPage, page, lastPage };

  //console.log("category", category);
  //console.log("pagination", pagination);
  //console.log("data", data);
  // res.json([data, category, pagination]);
  res.json([data, category]);
});
