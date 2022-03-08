const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const moment = require("moment");
moment.locale("zh-tw");

router.get("/", async (req, res, next) => {
  let [data] = await connection.execute(
    `SELECT a.id, a.name, a.logo, a.open_time, a.close_time, a.close_day, a.stores_category_id, b.category
    FROM stores AS a 
    JOIN stores_category AS b ON a.stores_category_id = b.id
    WHERE a.valid = 1 ORDER BY RAND()`
  );
  // -------- 營業時間判斷＆處理 --------
  data.map((item) => {
    //*[step 1] 轉換卡面顯示的時間格式 => 00:00 (24小時制)
    item.open_time = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
    item.close_time = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
    //*[step 2] 判斷目前是否營業中
    //TODO 判斷 a.現在時間
    let nowTime = Number(moment().format("HHmm"));
    //開發中的假時間
    // let nowTime = 2131;
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
  //  data.filter((v) => v.opState === true).slice(2, 6);
  res.json(
    data.filter((v) => v.opState === true).length !== 0
      ? data.filter((v) => v.opState === true).slice(2, 6)
      : data.slice(2, 6)
  );
});

module.exports = router;
