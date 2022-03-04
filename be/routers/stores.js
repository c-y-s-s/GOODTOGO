const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const moment = require("moment");
moment.locale("zh-tw");

//*有分頁的店家列表: api/stores/
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
  // -------- 營業時間判斷＆處理 --------
  data.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    // console.log("storeOpen", storeOpen);
    // console.log("storeClose", storeClosed);
    // console.log("closeDay", closeDay);
    // console.log("opState", item.opState);
  });
  // -------- 計算餐點剩餘數量 --------
  let [storeProducts] = await connection.execute(
    `SELECT store_id,
    amount,
    start_time,
    due_time
    FROM products
    WHERE valid=1;`
  );
  let productAmout = storeProducts.reduce((accu, current) => {
    // console.log("accu", accu);
    // console.log("current", current);
    if (!accu[current.store_id]) {
      accu[current.store_id] = 0;
    }
    accu[current.store_id] += current.amount;
    return accu;
  }, {});
  // console.log("productAmout", productAmout);
  // -------- 愛心計算 --------
  // 取得 -> 所有店 store_id 各自愛心數量 likeTotal
  let [storeLikeCount] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id;`
  );
  let likeCount = storeLikeCount.reduce((accu, current) => {
    // console.log("accu", accu);
    // console.log("current", current);
    if (!accu[current.store_id]) {
      accu[current.store_id] = 0;
    }
    accu[current.store_id] += current.likeTotal;
    return accu;
  }, {});
  console.log("likeCount", likeCount);
  // console.log("喜愛店家們 的 愛心計算 storeLikeCount: ", storeLikeCount);
  // -------- 取得商家分類 --------
  let [category] = await connection.execute("SELECT * FROM stores_category");
  // -------- 取得各家星星 --------
  let [starResult] = await connection.execute(
    `SELECT
    store_id,
    round(SUM(star)/count(id),1) AS score
    FROM products_comment
    GROUP BY store_id;`
  );
  //score字串轉浮點數
  let starCount = starResult.reduce((accu, current) => {
    // console.log("accu", accu);
    // console.log("current", current);
    if (!accu[current.store_id]) {
      accu[current.store_id] = 0;
    }
    accu[current.store_id] += parseFloat(current.score);
    return accu;
  }, {});
  console.log("starCount", starCount);
  // -------- 整理分頁資訊回傳的資料 --------
  //全部商家數，一頁幾筆資料，在第幾頁，最後一頁
  let pagination = { total, perPage, page, lastPage };
  //console.log("有分頁無過濾的data", data);
  //回傳：有分頁的商家列表，商家種類，分頁資訊，收藏愛心
  res.json([data, category, pagination, likeCount, productAmout, starCount]);
});
//*搜尋店家列表:  api/stores/search
router.get("/search", async (req, res, next) => {
  let keyword = req.query.keyword;
  // 分頁：每頁幾筆資料
  const perPage = 16;
  // 目前頁數：如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;
  //fetch 符合keyword的店名
  let [searchedStores] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category
    FROM stores AS a
    JOIN stores_category AS b ON a.stores_category_id = b.id
    WHERE a.name LIKE ? LIMIT ? OFFSET ? `,
    [`%${keyword}%`, perPage, offset]
  );
  //-------- 計算搜尋筆數 & 分頁--------
  // 總共搜尋到幾筆
  let total = searchedStores.length;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);
  // -------- 營業時間判斷＆處理 --------
  searchedStores.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    console.log("search: storeOpen", storeOpen);
    console.log("search: storeClose", storeClosed);
    console.log("search: closeDay", closeDay);
    console.log("search: opState", item.opState);
  });

  // -------- 整理分頁資訊回傳的資料 --------
  //全部商家數，一頁幾筆資料，在第幾頁，最後一頁
  let pagination = { total, perPage, page, lastPage };
  console.log("keyword", keyword);
  res.json([searchedStores, pagination]);
});
//*過濾-類別的店家列表:  api/stores/filter/c
router.get("/filter/c", async (req, res, next) => {
  let category = req.query.category;
  // 分頁：每頁幾筆資料
  const perPage = 16;
  // 目前頁數：如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  // 計算 SQL 要用的 offset
  let offset = (page - 1) * perPage;
  //fetch 符合keyword的店名
  let [filteredStores] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category
    FROM stores AS a
    JOIN stores_category AS b ON a.stores_category_id = b.id
    WHERE b.category LIKE ? LIMIT ? OFFSET ? `,
    [`%${category}%`, perPage, offset]
  );
  //-------- 計算搜尋筆數 & 分頁--------
  // 總共搜尋到幾筆
  let total = filteredStores.length;
  // lastPage: 總共有幾頁
  const lastPage = Math.ceil(total / perPage);
  // -------- 營業時間判斷＆處理 --------
  filteredStores.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    // console.log("filter: storeOpen", storeOpen);
    // console.log("filter: storeClose", storeClosed);
    // console.log("filter: closeDay", closeDay);
    // console.log("filter: opState", item.opState);
  });

  // -------- 整理分頁資訊回傳的資料 --------
  //全部商家數，一頁幾筆資料，在第幾頁，最後一頁
  let pagination = { total, perPage, page, lastPage };
  res.json([filteredStores, pagination]);
});
//*過濾-營業時間的店家列表: api/stores/filter/op
router.get("/filter/op", async (req, res, next) => {
  // let isOpen = req.query.op;
  let isOpen = JSON.parse(req.query.op);
  // 目前頁數：如果沒有設定 req.quyer.page，那就設成 1
  // let page = req.query.page || 1;
  // // 分頁：每頁幾筆資料
  // const perPage = 16;
  // // 計算 SQL 要用的 offset
  // let offset = (page - 1) * perPage;
  let [allStores] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category
        FROM stores AS a
        JOIN stores_category AS b ON a.stores_category_id = b.id`
  );
  // -------- 營業時間判斷＆處理 --------
  allStores.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    // console.log("filter: opState", item.opState);
  });
  //處理需要的資料
  let opResult = allStores.filter((item) => item.opState === isOpen);

  //-------- 計算搜尋筆數 & 分頁--------
  // // 總共搜尋到幾筆
  // let total = opResult.length;
  // // lastPage: 總共有幾頁
  // const lastPage = Math.ceil(total / perPage);
  // console.log("isOpen", isOpen);
  // console.log("opResult", opResult);
  res.json(opResult);
});
//*排序-api/stores/rating/heart
router.get("/rating/heart", async (req, res, next) => {
  let [likeResult] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id
    ORDER BY likeTotal DESC;`
  );

  let [storeResult] = await connection.execute(
    `SELECT a.id,
    a.name,
    a.logo,
    a.open_time,
    a.close_time,
    a.close_day,
    b.category
    FROM stores AS a
    JOIN stores_category AS b ON b.id=a.stores_category_id
    WHERE a.valid = 1;`
  );

  let [starResult] = await connection.execute(
    `SELECT
    store_id,
    round(SUM(star)/count(id),1) AS score
    FROM products_comment
    GROUP BY store_id;`
  );

  storeResult.map((item) => {
    // 放入 愛心
    let setLike = likeResult.find(
      (v) => Object.values(v)[0] === Object.values(item)[0]
    );
    if (setLike) {
      item.like = setLike.likeTotal;
    } else {
      item.like = 0;
    }

    // 放入星星
    let setStar = starResult.find(
      (v) => Object.values(v)[0] === Object.values(item)[0]
    );
    if (setStar) {
      item.star = setStar.score;
    } else {
      item.star = 0;
    }
  });

  storeResult.sort(function (a, b) {
    // boolean false == 0; true == 1
    return b.like - a.like;
  });

  storeResult.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    // console.log("filter: opState", item.opState);
  });
  console.log("storeResult數量", storeResult);
  res.json(storeResult);
});
//*排序-api/stores/rating/comment
router.get("/rating/comment", async (req, res, next) => {
  let [likeResult] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id
    ORDER BY likeTotal DESC;`
  );

  let [storeResult] = await connection.execute(
    `SELECT a.id,
    a.name,
    a.logo,
    a.open_time,
    a.close_time,
    a.close_day,
    b.category
    FROM stores AS a
    JOIN stores_category AS b ON b.id=a.stores_category_id
    WHERE a.valid = 1;`
  );

  let [starResult] = await connection.execute(
    `SELECT
    store_id,
    round(SUM(star)/count(id),1) AS score
    FROM products_comment
    GROUP BY store_id;`
  );

  storeResult.map((item) => {
    // 放入 愛心
    let setLike = likeResult.find(
      (v) => Object.values(v)[0] === Object.values(item)[0]
    );
    if (setLike) {
      item.like = setLike.likeTotal;
    } else {
      item.like = 0;
    }

    // 放入星星
    let setStar = starResult.find(
      (v) => Object.values(v)[0] === Object.values(item)[0]
    );
    if (setStar) {
      item.star = setStar.score;
    } else {
      item.star = 0;
    }
  });

  storeResult.sort(function (a, b) {
    // boolean false == 0; true == 1
    return b.star - a.star;
  });

  storeResult.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    //?let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    let nowTime = 2131;
    //把營業時間轉為數字 09:30 -> 930
    let storeOpen = Number(moment(item.open_time, "hh:mm").format("hhmm"));
    let storeClosed = Number(moment(item.close_time, "hh:mm").format("HHmm")); //2130
    //今天星期？
    let today = Number(moment().format("d")); //今天星期：1
    //休息時間轉為數字
    let closeDay = JSON.parse(item.close_day); //[3,5]
    //let opState = item.opState;
    //TODO 判斷休息與否：a.現在時間 早於 storeOpen || 晚於storeClosed || closeDay裡面有今天就是休息
    if (
      nowTime < storeOpen ||
      nowTime > storeClosed ||
      closeDay.includes(today)
    ) {
      item.opState = false; //false=休息中
    } else {
      item.opState = true; //true=營業中
    }
    // console.log("filter: opState", item.opState);
  });
  console.log("storeResult數量", storeResult);
  res.json(storeResult);
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
    "SELECT a.* , b.category FROM stores AS a JOIN products_category AS b ON b.id = a.stores_category_id WHERE a.id = ?",
    [req.params.storeId]
  );
  res.json(data);
});
// ------- 結束 --------

module.exports = router;
