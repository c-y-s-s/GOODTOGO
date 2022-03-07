const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { checkLogin } = require("../middleware/checkLogin");
const path = require("path");
// express-validator 驗證
const { body, validationResult } = require("express-validator");
// multer 上傳圖片用
const multer = require("multer");
// bcrypt 雜湊密碼用
// const bcrypt = require("bcrypt");
const argon2 = require("argon2");
// moment 時間
const moment = require("moment");

// 自訂 較好對應資料庫
// 星期轉換為數字
// 時間格式轉換
moment.locale("zh-tw", {
  weekdays: "7_1_2_3_4_5_6".split("_"),
  longDateFormat: {
    LT: "H:m", // 23:33
    LTS: "HH:mm:ss", // 23:33:45
  },
});

// 會員登入後 先到 auth 比對帳密 -> 登入成功 -> 回應前端(登入頁) session 資料
// 登入成功後進到內頁 /member -> 利用 session 確認有無登入過 -> 進到其他路由中間件撈資料 profile/password...

// -------- 驗證是否已登入 中間件 --------
router.use(checkLogin); // 抽離成 middleware 引入
router.use((req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  // req.session.member = {
  //   id: member.id,
  //   name: member.name,
  //   photo: member.photo
  // }
  // req.session.member = {
  //   id: 2,
  //   name: "王嘉雯",
  //   // photo: "",
  //   photo: "/static/uploads/headshots/member-1646235995063.png",
  // };
  // ----- 測試，假設已取得登入後的 session

  console.log("req.session.member", req.session.member);
  next();
  // 有無 session
  // if (req.session.member) {
  //   // 表示登入過
  //   // console.log("測試 has session");
  //   next(); // 這樣會跳出 router 到 server.js 繼續 next()???
  // } else {
  //   // 表示尚未登入
  //   res.status(400).json({
  //     code: "99001",
  //     msg: "會員未登入",
  //   });
  // }

  // 到這裡，表示 req.session.member 一定有資料
  // next(); // 往下走讓 其他頁撈資料
  // res.json(req.session.member); // 先測試看看前端能不能得到 session
});
// -------- 驗證是否已登入 中間件 結束 --------

// 檢查要 update 的資料是否符合格式 中間件
// express-validator {body} 驗證
const updateProfileRules = [
  //前後端錯誤訊息
  body("name").contains().withMessage("姓名 請填寫正確格式"),
  body("email").isEmail().withMessage("電子信箱 請填寫正確格式"),
  body("phone").isNumeric().withMessage("電話號碼 請填寫正確格式"), //.isMobilePhone()
];

// 設定上傳圖片儲存資訊 (資料夾、檔名)
const storage = multer.diskStorage({
  // 設定儲存的目的地(硬碟->檔案夾)
  destination: function (req, file, cb) {
    // ../public/uploads/headshots <-- 檔案夾要自己先建立好
    cb(null, path.join(__dirname, "..", "public", "uploads", "headshots"));
    // 錯誤訊息 先給null
  },
  // 設定儲存的檔名
  filename: function (req, file, cb) {
    // console.log("multer-filename: ", file);
    // 抓使用者上傳的檔名 file.originalname
    // 取用副檔名 ext
    const ext = file.originalname.split(".").pop();
    // 組合要放進資料夾(、資料庫)的名稱
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

// router.post 過濾圖片用的中間件
const uploader = multer({
  storage: storage, // 上面的 storage 圖片儲存資訊
  // 過濾 圖片類型
  fileFilter: function (req, file, cb) {
    // console.log("file.mimetype: ", file.mimetype);
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      cb(new Error("不接受的檔案類型"), false);
      // 固定用法
    } else {
      cb(null, true); // 接受此文件
    }
  },
  // 過濾 檔案尺寸
  limits: {
    // 1K: 1024 bytes
    fileSize: 200 * 1024, // 限制 < 200K
  },
});

// 檢查 新密碼 確認密碼 是否一致 中間件
// express-validator {body} 驗證
const updatePasswordRules = [
  body("confirmPassword")
    .custom((value, { req }) => {
      // confirmPassword value
      // 傳入兩個值 value, { req } (文件這樣寫的)
      return value === req.body.newPassword; // true or false
      // confirmPassword value === req.body.newPassword
    })
    .withMessage("新密碼、確認密碼欄位輸入不一致"),
];

// -------- 會員資料顯示 --------
// /api/member/profile (get)
router.get("/profile", async (req, res, next) => {
  let [data] = await connection.execute(
    `SELECT
    name,
    email,
    phone,
    headshots
    FROM users
    WHERE id=?;`,
    [req.session.member.id]
  );
  console.log("db_users id: ", req.session.member.id);
  console.log("取得 user: ", data);

  let [emails] = await connection.execute(`SELECT email FROM users;`);
  // console.log("取得 emails: ", emails);

  let [likes] = await connection.execute(
    `SELECT store_id FROM user_like WHERE user_id=?;`,
    [req.session.member.id]
  );
  let [orders] = await connection.execute(
    `SELECT id,
    status_id
    FROM user_order
    WHERE user_id=?;`,
    [req.session.member.id]
  );

  // console.log(likes.length);
  // console.log(orders.length);
  // 打包資料給 res
  let profile = {
    name: data[0].name,
    email: data[0].email,
    phone: data[0].phone,
    photo: data[0].headshots,
    // photo: req.session.member.photo,
  };
  res.json({ profile, emails, likes, orders });
});

// -------- 會員資料修改儲存 --------
// /api/member/profile/edit (post)
router.post(
  "/profile/edit",
  uploader.single("photo"),
  // 只傳一張 single // fieldname: photo 表單欄位名稱
  updateProfileRules, // 驗證更新資料中間件

  async (req, res, next) => {
    // express-validator 驗證結果 回傳錯誤訊息
    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
      // 驗證結果有問題
      let error = validateResult.mapped();
      // 錯誤驗證結果轉為 array / mapped 方便取得錯誤結果
      // console.log("profile validateResult(error): ", error); // 測試錯誤訊息是否會出現
      // 陣列-> [ { value: '...', msg: '...(withMessage的錯誤訊息)', param: '...', location: 'body' } ]
      return res.status(400).json({
        code: "66001",
        msg: error,
      });
    }

    // 檢查 email 是不是非原本使用者、已經註冊
    let [members] = await connection.execute(
      "SELECT * FROM users WHERE email=?",
      [req.body.email]
      // req.body (form post 的物件 裡面的 email)
    );
    // console.log("有沒有此 email", members); // [] 空的 -> 沒有此email -> 可以註冊
    // console.log("有沒有此 email id", members[0].id);
    // console.log("此使用者登入的 id", req.session.member.id);
    if (members.length > 0 && members[0].id !== req.session.member.id) {
      // 表示有查到此 email 且不是使用者原本的 email -> 註冊過了
      return res.status(400).send({
        // send? json?
        code: "33002",
        msg: "這個 email 已經註冊過了",
      });
    }

    // 到這邊表示前面沒錯誤了 (所有資料驗證ok、email尚未被註冊)

    // 處理圖片
    // console.log("前端送來、multer中間件處理過 req.file: ", req.file);
    let filename = req.file
      ? "/static/uploads/headshots/" + req.file.filename
      : req.body.photo === "remove"
      ? ""
      : req.session.member.photo;
    // 是否有移除圖片
    console.log("remove???", req.body.photo);
    // console.log("加上路徑的 filename: ", filename);

    // -------- 儲存到資料庫 --------
    let [updateProfileResult] = await connection.execute(
      `UPDATE users SET name=?, email=?, phone=?, headshots=? WHERE id=?;`,
      [
        req.body.name,
        req.body.email,
        req.body.phone,
        filename,
        req.session.member.id,
      ]
    );
    // console.log(updateProfileResult);

    // -------- 更新 session --------
    let returnUser = {
      ...req.session.member,
      name: req.body.name,
      photo: filename,
    };
    console.log("returnUser", returnUser);
    // 寫 session
    req.session.member = returnUser;

    // 寫內容前先測試能不能得到 req
    // console.log("req.body: ", req.body);
    res.json({
      name: req.body.name,
      photo: filename,
      message: "儲存修改資料 ok",
    });
  }
);
// -------- 會員信用卡資料顯示 --------
router.get("/payment", async (req, res, next) => {
  let [creditNum] = await connection.execute(
    `SELECT
    credit_number
    FROM users
    WHERE id=?;`,
    [req.session.member.id]
  );
  res.json(creditNum[0]);
});

// -------- 會員信用卡更新 --------
// /api/member/payment/edit (post)
router.post("/payment/edit", async (req, res, next) => {
  // 處理信用卡號碼
  let twelveNum = req.body.number.split(" ").slice(0, -1).join("");
  let fourNum = req.body.number.split(" ").pop();
  // 寫內容前先測試能不能得到 req
  console.log("payment req.body: ", req.body);
  console.log("payment req.body.number 前12碼: ", twelveNum);
  console.log("payment req.body.number 後4碼: ", fourNum);

  // 雜湊 hashNum
  let hashtwelveNum = await argon2.hash(twelveNum);

  // -------- 儲存到資料庫 --------
  let [updateCreditResult] = await connection.execute(
    `UPDATE users
    SET credit_card=?,credit_number=?
    WHERE id=?;`,
    [hashtwelveNum, fourNum, req.session.member.id]
  );
  // console.log("updateCreditResult", updateCreditResult);

  res.json({
    fourNum: fourNum,
    message: "儲存更新信用卡 ok",
  });
});

// -------- 會員密碼修改儲存 --------
// /api/member/password (post)
router.post("/password", updatePasswordRules, async (req, res, next) => {
  // 拿到 updatePasswordRules 驗證的結果
  // express-validator {validationResult}
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的 (表示驗證結果有問題)
    let error = validateResult.array();
    // 把錯誤驗證結果變成 array 方便我們取得錯誤結果
    // console.log("password validateResult(error): ", error);
    // 測試錯誤訊息是否會出現
    // 陣列-> [ { value: '...', msg: '...(withMessage的錯誤訊息)', param: '...', location: 'body' } ]
    // 錯誤訊息作為 res 傳回給前端 (後端處理自訂給前端)
    return res.status(400).json({
      code: "33003",
      msg: error[0].msg,
      // 根據上面測試錯誤的話 回傳的結構 知道驗證完若沒通過的withMessage訊息會在 error[0].msg 裡
    });
  }

  // 檢查 req.body.password 密碼是否正確，正確才能改新密碼
  let [passwordResult] = await connection.execute(
    `SELECT password FROM users WHERE id=?;`,
    [req.session.member.id]
  );
  // 把會員資料從陣列中拿出來
  let userPassword = passwordResult[0];
  // 比對密碼
  let result = await argon2.verify(userPassword.password, req.body.password);
  // argon2 的雜湊後的長密碼要寫前面去驗證
  // let result = await bcrypt.compare(req.body.password, userPassword.password);
  if (!result) {
    // 如果比對失敗
    // console.log("比對密碼結果失敗: ", result);
    return res.status(400).send({
      code: "33004",
      msg: "會員密碼驗證錯誤",
    });
  }

  // 寫到這 先測試 是否能比對密碼成功(用前台送出表單測試)
  // 再進行後續儲存

  // 雜湊 newPassword
  let hashNewPassword = await argon2.hash(req.body.newPassword);
  // let hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);
  // 第二個參數是 saltRounds 是指把輸入的密碼再去加其他字母的次數 10就是加10次

  // -------- 儲存到資料庫 --------
  let [updatePasswordResult] = await connection.execute(
    `UPDATE users SET password=? WHERE id=?;`,
    [hashNewPassword, req.session.member.id]
  );
  // console.log(updatePasswordResult);

  // 寫內容前先測試能不能得到 req
  // console.log("req.body: ", req.body);
  res.json({
    message: "儲存修改密碼 ok",
  });
});

// -------- 會員店家收藏清單 --------
// /api/member/like (get)
router.get("/like", async (req, res, next) => {
  // 會員 id
  // 取得 -> like 的店家資訊 id、照片、名稱、營業開始時間、結束時間、未營業星期、店家類別
  let [userLikeStores] = await connection.execute(
    `SELECT user_like.id AS user_like_id, 
    stores.id AS storeId,
    stores.logo AS storeImg,
    stores.name AS storeName,
    stores.open_time AS openTime,
    stores.close_time AS closeTime,
    stores.close_day AS closeDay,
    stores_category.category AS storeCate
    FROM user_like
    JOIN stores ON user_like.store_id = stores.id 
    JOIN stores_category ON stores.stores_category_id = stores_category.id
    WHERE user_id=?
    ORDER BY user_like.id ASC;`,
    [req.session.member.id]
  );
  // console.log("user_id: ", req.session.member.id);
  // console.log("取得 喜愛店家 userLikeStores: ", userLikeStores);

  // 列出 喜愛店家們 storeId
  // 用 map 取出 陣列裡面的{物件}值 每個物件值 陣列裡面的第 2 個 (storeId值)
  // Object.values(item) 物件值 是個陣列 ["user_like.id值", "storeId值", "storeImg值"...]
  let likeStoreIds = userLikeStores.map((item) => Object.values(item)[1]);
  // console.log("列出 喜愛店家們 storeId : ", likeStoreIds); // [3,5,2,...]

  // -------- 愛心計算 --------
  // 取得 -> 所有店 store_id 各自愛心數量 likeTotal
  let [storeLikeCount] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id;`
  );
  // console.log("喜愛店家們 的 愛心計算 storeLikeCount: ", storeLikeCount);

  // -------- 星星計算 --------
  // 店家 storeId
  // 取得 -> 每間店有的商品們
  // let storesProducts = [];
  // if (likeStoreIds.length > 0) {}
  let [storesProducts] = await connection.execute(
    `SELECT * FROM products
    WHERE store_id IN (${likeStoreIds.join(",")});`
  );
  // console.log("喜愛店家們 的 所有商品們 資料 :", storesProducts.length, "筆");
  // console.log("喜愛店家們 的 所有商品們 資料 :", storesProducts);

  // 列出 喜愛店家們 的 所有商品們的 id
  let productIds = storesProducts.map((item) => {
    return item.id;
  });
  // console.log("列出 喜愛店家們 的 所有商品們的 id: ", productIds);

  // 計算 各店家 的 各全部商品 star 分數(各店各商品總分數平均)
  let [storeStarScore] = await connection.execute(
    // `SELECT count(id) AS count, products_id, store_id, SUM(star) ,
    // FROM products_comment
    // WHERE products_id IN (${productIds.join(",")})
    // GROUP BY store_id;`

    //   `SELECT count(id) AS count, products_id, store_id, SUM(star) ,round(SUM(star)/count(id),1)
    //   FROM products_comment
    //   WHERE products_id IN (7,  8,   9,  10,  11,  12,  13, 14, 15,
    // 16, 17,  18,  25,  26,  27,  28, 29, 30,
    // 49, 50,  51,  52,  53,  54,  73, 74, 75,
    // 76, 77, 123, 124, 125, 126, 127)
    //   GROUP BY store_id;`

    `SELECT count(id) AS commentTotal,
    store_id,
    SUM(star),
    round(SUM(star)/count(id),1) AS score
    FROM products_comment
    WHERE products_id IN (${productIds.join(",")})
    GROUP BY store_id
    ;`
  );
  // console.log("店家評分相關資料: ", storeStarScore);

  // -------- 餐點計算 --------
  // [ Step1 ] 取得 -> 所有店 store_id 各自餐點數量
  let [storeProducts] = await connection.execute(
    `SELECT store_id,
    amount AS productAmount,
    start_time AS startTime,
    due_time AS dueTime
    FROM products
    WHERE store_id IN (${likeStoreIds.join(",")})
    AND valid=1;`
  );
  // console.log(
  //   "喜愛店家 所有 products : ",
  //   storeProductCount,
  //   "總共",
  //   storeProductCount.length,
  //   "筆"
  // );

  // [ Step2 ] 過濾時間 -> 將餐點有符合現在時間的過濾出來
  let storeProductAtTime = storeProducts.filter((product) => {
    // 時間格式化 為數字
    let currentTime = moment()
      .format("LTS")
      .split(":")
      .slice(0, -1)
      .concat(["00"])
      .join(":");
    let currentTime_number = Number(currentTime.split(":").join(""));
    let startTime_number = Number(product.startTime.split(":").join(""));
    let dueTime_number = Number(product.dueTime.split(":").join(""));
    return (
      currentTime_number >= startTime_number &&
      currentTime_number < dueTime_number
    );
  });
  // console.log(
  //   "現在時間於 餐點時間內的",
  //   storeProductAtTime,
  //   "總共",
  //   storeProductAtTime.length,
  //   "筆"
  // );

  // [ Step3 ] 計算數量 -> 總計各間店餐點剩餘總數
  let storeProductAmount = storeProductAtTime.reduce((accumulator, curr) => {
    if (!accumulator[curr.store_id]) {
      accumulator[curr.store_id] = 0;
    }
    accumulator[curr.store_id] += curr.productAmount;
    return accumulator;
  }, {});
  // console.log("各 store_id 餐點剩餘數量: ", storeProductAmount);
  // {'3':5, '5':9, '9':16, '13':6, ...}

  // 將愛心、星星 相關資料 利用 map 每筆放入 userLikeStores
  // 判斷 營業時間、剩餘餐點數量、圖片格式處理 利用 map 每筆放入 userLikeStores
  userLikeStores.map((item) => {
    // -------- 星星 --------
    // 找 storeStarScore 裡 store_id 對應的 userLikeStores 店家id (storeId)
    let comment = storeStarScore.find(
      (starScore) => Object.values(starScore)[1] === Object.values(item)[1]
    );
    // console.log(
    //   "找評論 store_id: ",
    //   comment.store_id,
    //   "星星分數: ",
    //   comment.score,
    //   "評論總數: ",
    //   comment.commentTotal
    // );
    // console.log(comment);

    // 若有比對到 就將 score、commentTotal 放進 userLikeStores
    if (comment) {
      item.starScore = comment.score;
      item.commentTotal = comment.commentTotal;
      // 將星星評論數值(comment.score) 放進 userLikeStores 並給 key (statScore)
      // 將評論總數(comment.commentTotal) 放進 userLikeStores 並給 key (commentTotal)
      // console.log("item.statScore: ", item.starScore);
      // console.log("item.commentTotal: ", item.commentTotal);
    } else {
      // 沒有評分的就給空值
      item.starScore = null;
      item.commentTotal = null;
    }

    // -------- 愛心 --------
    // 找 storeLikeCount 裡 store_id 對應的 userLikeStores 店家id (storeId)
    let likes = storeLikeCount.find(
      (likeCount) => Object.values(likeCount)[0] === Object.values(item)[1]
    );
    // console.log(
    //   "找愛心 store_id: ",
    //   likes.store_id,
    //   "星星分數: ",
    //   likes.likeTotal
    // );

    // 若有比對到 就將 likeTotal 放進 userLikeStores
    if (likes) {
      item.likeTotal = likes.likeTotal;
    } else {
      // 沒有like數的就給空值
      item.likeTotal = null;
    }

    // -------- 圖片 --------
    // 新增讓前端讀取檔案路徑
    item.storeImg = "/static/uploads/stores/" + item.storeImg;

    // -------- 餐點剩餘 --------
    // 前面有計算先將符合現在時間的餐點篩選出來、加總
    // console.log("各 store_id 餐點剩餘數量: ", storeProductAmount);
    // {'3':15, '5':9, '9':16, '13':6, ...}
    // 找 storeProductAmount 裡 key值(是字串) 對應的 userLikeStores 店家id (storeId)
    let find = Object.keys(storeProductAmount).find(
      (v) => v === Object.values(item)[1].toString() // 要.toString() 轉字串
    );
    // console.log("找key對應店家store_id:", find);
    // 若有比對到 就將 key 對應的值 放進 userLikeStores
    if (find) {
      item.products = storeProductAmount[find]; // key 3 的值 "15" 放入
      // console.log("將找到的 key 的值 放入item.products:", storeProductAmount[find]);
    } else {
      // 沒有 find 餐點數量為 0
      item.products = 0;
    }

    // -------- 時間 --------
    // [ Step 1 ] 判斷 item 的 closeDay 店休日
    // -> 若休息 餐點剩餘也 = 0
    let today = Number(moment().format("d"));
    // console.log("今日星期 today", today);
    let isToday = JSON.parse(Object.values(item)[6]);
    // console.log("店休星期 isToday", isToday);

    let find_closeDay = isToday.find((day) => {
      return day === today;
    });
    // console.log("店休星期 = 今日星期 find", find);

    // [ Step 2 ] 判斷 item 的 openTime closeTime 營業時間
    // 格式化為 00:00:00 --- 要判斷有無開店用 (刪除毫秒補上00)
    // 開店時間
    let storeOpen = item.openTime
      .split(":")
      .slice(0, -1)
      .concat(["00"])
      .join(":");
    let storeOpen_number = Number(storeOpen.split(":").join(""));
    // 關店時間
    let storeClose = item.closeTime
      .split(":")
      .slice(0, -1)
      .concat(["00"])
      .join(":");
    let storeClose_number = Number(storeClose.split(":").join(""));
    // 現在時間
    // console.log(moment().format("LTS"));
    let current = moment()
      .format("LTS")
      .split(":")
      .slice(0, -1)
      .concat(["00"])
      .join(":");
    let current_number = Number(current.split(":").join(""));
    // console.log("storeOpen:", storeOpen, "storeClose:", storeClose);
    // console.log(
    //   "storeOpen_number:",
    //   storeOpen_number,
    //   "storeClose_number:",
    //   storeClose_number,
    //   "current_number",
    //   current_number
    // );

    // [ Step 3 ] 比對 公休日、營業時間 -> 顯示 營業 非營業
    // 有比對到 今日休息
    while (true) {
      if (find_closeDay) {
        item.isToday = "休息中";
        item.products = 0; // 休息 -> 餐點剩餘 0
        break;
      }
      if (current_number < storeOpen_number) {
        item.isToday = "休息中";
        item.products = 0; // 休息 -> 餐點剩餘 0
        break;
      }
      if (current_number >= storeClose_number) {
        item.isToday = "休息中";
        item.products = 0; // 休息 -> 餐點剩餘 0
        break;
      }
      // 沒比對到 今日營業
      item.isToday = "營業中";
      break;
    }

    // 格式化為 00:00 --- 要顯示在卡片上的
    item.openTime = item.openTime.split(":").slice(0, -1).join(":");
    item.closeTime = item.closeTime.split(":").slice(0, -1).join(":");
    // console.log(
    //   "item.openTime:",
    //   item.openTime,
    //   "item.closeTime:",
    //   item.closeTime
    // );

    // -------- 主店名、分店名 --------
    let name = item.storeName.split(" ");
    item.storeName = name[0];
    item.storeBranchName = name[1];
  });

  // 店家類別列表
  let [storeCategories] = await connection.execute(
    `SELECT id AS categoryId,
    category
    FROM stores_category
    WHERE valid=1;`
  );
  // 新增 "全部" 類別
  storeCategories.unshift({ categoryId: 0, category: "全部" });
  // console.log(storeCategories);

  // 傳送使用者喜愛店家清單、喜愛店家 storeId 列表
  res.json({ userLikeStores, likeStoreIds, storeCategories });
});

// -------- 會員移除收藏店家 --------
// /api/member/like/remove (post)
router.post("/like/remove", async (req, res, next) => {
  // 沒有接收到資料
  if (!req.body.removeStoreId) {
    res.json({
      code: 88001,
      message: "會員移除收藏店家 失敗",
    });
  }
  let [removeLikeStoreResult] = await connection.execute(
    `DELETE FROM user_like WHERE user_id=? AND store_id=?;`,
    [req.session.member.id, req.body.removeStoreId]
  );

  // console.log(req.body.removeStoreId);
  console.log("刪除會員收藏資料結果: ", removeLikeStoreResult);
  res.json({
    message: "會員移除收藏店家 ok",
  });
});

// -------- 我的訂單 ALL --------
// /api/member/order (get)
router.get("/order", async (req, res, next) => {
  // 列出使用者的訂單
  let [userOrder] = await connection.execute(
    `SELECT A.id,
    A.store_id,
    stores.name AS store_name,
    category AS store_category,
    order_status.id AS order_status_id,
    order_status.status,
    A.order_number,
    A.order_time
    FROM user_order AS A
    JOIN order_status ON A.status_id = order_status.id
    JOIN stores ON A.store_id = stores.id
    JOIN stores_category ON stores.stores_category_id = stores_category.id
    WHERE A.user_id=?  
    ORDER BY A.id DESC;`,
    [req.session.member.id]
  );
  // console.log("我的訂單 userOrder: ", userOrder);

  // 列出訂單 id
  let orderIds = userOrder.map((item) => {
    return item.id;
  });
  // console.log(orderIds);

  // 用 orderIds 取 訂單細節
  let [userOrderDetail] = await connection.execute(
    `SELECT B.order_id,
    B.product_id,B.amount,
    products.name AS product_name,
    products.img,products.price
    FROM user_order_detail B
    JOIN products ON products.id=B.product_id
    WHERE B.order_id IN (${orderIds.join(",")})
    ORDER BY B.order_id DESC;`
  );
  // console.log("我的訂單 userOrderDetail: ", userOrderDetail);

  // 將 userOrder 的 id 提出來當 key
  let userOrderMap = userOrder.reduce((accumulator, curr) => {
    accumulator[curr.id] = curr;
    return accumulator;
  }, {});
  // console.log("userOrderMap", userOrderMap);

  // userOrderDetail map 時 利用 key(上面提出的id) 與 detail.order_id 對應
  // 對應到之後 將該筆訂單的細節 push 到自組的 details 空陣列裡
  userOrderDetail.map((detail) => {
    // 處理圖片
    // 將產品細節 img 新增讓前端讀取檔案路徑
    detail.img = "/static/uploads/products_img/" + detail.img;

    // 將購買產品細節 置入自建的 details 陣列裡
    if (!userOrderMap[detail.order_id].details) {
      userOrderMap[detail.order_id].details = [];
    }
    userOrderMap[detail.order_id].details.push(detail);

    // 計算總金額
    if (!userOrderMap[detail.order_id].totalAmount) {
      userOrderMap[detail.order_id].totalAmount = 0;
    }
    userOrderMap[detail.order_id].totalAmount += detail.amount * detail.price;
  });
  // 觀察資料
  // console.log("userOrderMap", userOrderMap);
  // console.log("userOrder", userOrder);
  // 物件 pass by reference , userOrder 也跟著被改變
  // userOrderMap 會等同 userOrder

  res.json(userOrder);
});

// -------- 我的訂單 Status=? --------
// /api/member/order/status=? (get)
router.get("/order/:status", async (req, res, next) => {
  // console.log(req.params.status)
  let status_num = req.params.status.split("=").pop();
  // console.log(status_num)
  // 列出使用者的訂單
  let [userOrder] = await connection.execute(
    `SELECT A.id,
    A.store_id,
    stores.name AS store_name,
    category AS store_category,
    order_status.id AS order_status_id,
    order_status.status,
    A.order_number,
    A.order_time
    FROM user_order AS A
    JOIN order_status ON A.status_id = order_status.id
    JOIN stores ON A.store_id = stores.id
    JOIN stores_category ON stores.stores_category_id = stores_category.id
    WHERE A.user_id=? AND order_status.id=?
    ORDER BY A.id DESC;`,
    [req.session.member.id, status_num]
  );
  // console.log("我的訂單 userOrder: ", userOrder);

  // 列出訂單 id
  let orderIds = userOrder.map((item) => {
    return item.id;
  });
  // console.log(orderIds);

  // 用 orderIds 取 訂單細節
  let [userOrderDetail] = await connection.execute(
    `SELECT B.order_id,
    B.product_id,B.amount,
    products.name AS product_name,
    products.img,products.price
    FROM user_order_detail B
    JOIN products ON products.id=B.product_id
    WHERE B.order_id IN (${orderIds.join(",")})
    ORDER BY B.order_id DESC;`
  );
  // console.log("我的訂單 userOrderDetail: ", userOrderDetail);

  // 將 userOrder 的 id 提出來當 key
  let userOrderMap = userOrder.reduce((accumulator, curr) => {
    accumulator[curr.id] = curr;
    return accumulator;
  }, {});
  // console.log("userOrderMap", userOrderMap);

  // userOrderDetail map 時 利用 key(上面提出的id) 與 detail.order_id 對應
  // 對應到之後 將該筆訂單的細節 push 到自組的 details 空陣列裡
  userOrderDetail.map((detail) => {
    // 處理圖片
    // 將產品細節 img 新增讓前端讀取檔案路徑
    detail.img = "/static/uploads/products_img/" + detail.img;

    // 將購買產品細節 置入自建的 details 陣列裡
    if (!userOrderMap[detail.order_id].details) {
      userOrderMap[detail.order_id].details = [];
    }
    userOrderMap[detail.order_id].details.push(detail);

    // 計算總金額
    if (!userOrderMap[detail.order_id].totalAmount) {
      userOrderMap[detail.order_id].totalAmount = 0;
    }
    userOrderMap[detail.order_id].totalAmount += detail.amount * detail.price;
  });
  // 觀察資料
  // console.log("userOrderMap", userOrderMap);
  // console.log("userOrder", userOrder);
  // 物件 pass by reference , userOrder 也跟著被改變
  // userOrderMap 會等同 userOrder

  res.json(userOrder);
});

// -------- 會員取消訂單 --------
// /api/member/order/cancel (post)
router.post("/order/cancel", async (req, res, next) => {
  // 沒有接收到資料
  if (!req.body.cancelOrder) {
    res.json({
      code: 88002,
      message: "會員取消訂單 失敗",
    });
  }
  let [cancelOrderResult] = await connection.execute(
    `UPDATE user_order SET status_id=3 WHERE user_id=? AND id=?;`,
    [req.session.member.id, req.body.cancelOrder]
  );

  console.log("req.body.cancelOrder: ", req.body.cancelOrder);
  console.log("取消訂單資料結果: ", cancelOrderResult);
  res.json({
    message: "會員取消訂單 ok",
  });
});

// -------- test 所有店家資訊 依愛心排序 --------
// router.get("/order/count/aaa", async (req, res, next) => {
//   let [likeResult] = await connection.execute(
//     `SELECT store_id, count(id) AS likeTotal
//     FROM user_like
//     GROUP BY store_id
//     ORDER BY likeTotal DESC;`
//   );

//   let [storeResult] = await connection.execute(
//     `SELECT a.id,
//     a.name,
//     a.logo,
//     a.open_time,
//     a.close_time,
//     a.close_day,
//     a.stores_category_id
//     FROM stores AS a
//     WHERE a.valid = 1;`
//   );

//   let [starResult] = await connection.execute(
//     `SELECT
//     store_id,
//     round(SUM(star)/count(id),1) AS score
//     FROM products_comment
//     GROUP BY store_id;`
//   );

//   storeResult.map((item) => {
//     // 放入 愛心
//     let setLike = likeResult.find(
//       (v) => Object.values(v)[0] === Object.values(item)[0]
//     );
//     if (setLike) {
//       item.like = setLike.likeTotal;
//     } else {
//       item.like = 0;
//     }

//     // 放入星星
//     let setStar = starResult.find(
//       (v) => Object.values(v)[0] === Object.values(item)[0]
//     );
//     if (setStar) {
//       item.star = setStar.score;
//     } else {
//       item.star = 0;
//     }
//   });

//   storeResult.sort(function (a, b) {
//     // boolean false == 0; true == 1
//     return b.like - a.like;
//   });
//   console.log("storeResult數量", storeResult.length);
//   res.json(storeResult);
// });

module.exports = router;
