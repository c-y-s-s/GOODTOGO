const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
// express-validator 驗證
const { body, validationResult } = require("express-validator");
// multer 上傳圖片用
const multer = require("multer");
// bcrypt 雜湊密碼用
const bcrypt = require("bcrypt");
const moment = require("moment");

// 自訂 較好對應資料庫
// 星期轉換為數字
// 時間格式轉換
moment.locale("zh-tw", {
  weekdays: "7_1_2_3_4_5_5".split("_"),
  longDateFormat: {
    LT: "H:m", // 23:33
    LTS: "H:m:s", // 23:33:45
  },
});

// TODO: 會員登入後 先到 auth 比對帳密 -> 登入成功 -> 回應前端(登入頁) session 資料
// TODO: 登入成功後進到內頁 /member -> 利用 session 確認有無登入過 -> 進到其他路由中間件撈資料 profile/password...

// -------- 驗證是否已登入 中間件 --------
// TODO: router.use(checkLogin); // 最後要抽離成 middleware 引入
router.use((req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  // req.session.member = {
  //   id: member.id,
  //   name: member.name,
  //   photo: member.photo
  // }
  req.session.member = {
    id: 1,
    name: "林振軒",
    // photo: "",
    photo: "/static/uploads/headshots/member-1645247983164.png",
  };
  // ----- 測試，假設已取得登入後的 session

  console.log("routes", req.session.member);
  // 有無 session
  if (req.session.member) {
    // 表示登入過
    console.log("測試 has session");
    next(); // 這樣會跳出 router 到 server.js 繼續 next()???
  } else {
    // 表示尚未登入
    res.status(400).json({
      code: "99001",
      msg: "會員未登入",
    });
  }

  // 到這裡，表示 req.session.member 一定有資料
  // next(); // 往下走讓 其他頁撈資料
  // res.json(req.session.member); // 先測試看看前端能不能得到 session
});
// -------- 驗證是否已登入 中間件 結束 --------

// 檢查要 update 的資料是否符合格式 中間件
// express-validator {body} 驗證
const updateProfileRules = [
  // FIXME: 前後端錯誤訊息
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
    console.log("multer-filename: ", file);
    // 抓使用者上傳的檔名 file.originalname
    // 取用副檔名 ext
    const ext = file.originalname.split(".").pop();
    // 組合要放進資料夾(、資料庫)的名稱
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

//
// router.post 過濾圖片用的中間件
const uploader = multer({
  storage: storage, // 上面的 storage 圖片儲存資訊
  // 過濾 圖片類型
  fileFilter: function (req, file, cb) {
    console.log("file.mimetype: ", file.mimetype);
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
    "SELECT name, email, phone FROM users WHERE id=?",
    [req.session.member.id]
  );
  console.log("db_users id: ", req.session.member.id);
  console.log("取得 user: ", data);

  // 打包資料給 res
  let profile = {
    name: data[0].name,
    email: data[0].email,
    phone: data[0].phone,
    // photo: data[0].headshots,
    photo: req.session.member.photo,
  };
  res.json(profile);
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
      console.log("profile validateResult(error): ", error); // 測試錯誤訊息是否會出現
      // 陣列-> [ { value: '...', msg: '...(withMessage的錯誤訊息)', param: '...', location: 'body' } ]
      return res.status(400).json({
        code: "66001",
        msg: error,
      });
    }

    // FIXME: 未修改 email 一樣要能修改
    // 檢查 email 是不是已經註冊
    let [members] = await connection.execute(
      "SELECT * FROM users WHERE email=?",
      [req.body.email]
      // req.body (form post 的物件 裡面的 email)
    );
    console.log(members); // [] 空的 -> 沒有此email -> 可以註冊
    if (members.length > 0) {
      // 表示有查到此 email -> 註冊過了
      return res.status(400).send({
        // send? json?
        code: "33002",
        msg: "這個 email 已經註冊過了",
      });
    }

    // 到這邊表示前面沒錯誤了 (所有資料驗證ok、email尚未被註冊)

    // 處理圖片
    console.log("前端送來、multer中間件處理過 req.file: ", req.file);
    let filename = req.file
      ? "/static/uploads/headshots/" + req.file.filename
      : req.session.member.photo;
    console.log("加上路徑的 filename: ", filename);

    // -------- 儲存到資料庫 --------
    let [updateProfileResult] = await connection.execute(
      "UPDATE users SET name=?, email=?, phone=?, headshots=? WHERE id=?",
      [
        req.body.name,
        req.body.email,
        req.body.phone,
        filename,
        req.session.member.id,
      ]
    );
    console.log(updateProfileResult);

    // 寫內容前先測試能不能得到 req
    // console.log("req.body: ", req.body);
    res.json({
      name: req.body.name,
      photo: filename,
      message: "儲存修改資料 ok",
    });
  }
);

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
    console.log("password validateResult(error): ", error);
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
  let result = await bcrypt.compare(req.body.password, userPassword.password);
  if (!result) {
    // 如果比對失敗
    console.log("比對密碼結果失敗: ", result);
    return res.status(400).send({
      code: "33004",
      msg: "會員密碼驗證錯誤",
    });
  }

  // 寫到這 先測試 是否能比對密碼成功(用前台送出表單測試)
  // 再進行後續儲存

  // 雜湊 newPassword
  let hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);
  // 第二個參數是 saltRounds 是指把輸入的密碼再去加其他字母的次數 10就是加10次

  // -------- 儲存到資料庫 --------
  let [updatePasswordResult] = await connection.execute(
    `UPDATE users SET password=? WHERE id=?;`,
    [hashNewPassword, req.session.member.id]
  );
  console.log(updatePasswordResult);

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
  // 取得 -> like 的店家 id、照片、名稱、營業開始時間、結束時間、未營業星期、店家類別
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
  let [storeLikeCount] = await connection.execute(
    `SELECT store_id, count(id) AS likeTotal
    FROM user_like
    GROUP BY store_id;`
  );

  // console.log("喜愛店家們 的 愛心計算: ", storeLikeCount);

  // -------- 星星計算 --------
  // 店家 storeId
  // 取得 -> 每間店有的商品們
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

  // 計算 各店家 的 star 分數(各店各商品總分數平均)
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

  // 將愛心、星星相關資料 利用 map 每筆放入 userLikeStores
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

    // 處理圖片
    // 新增讓前端讀取檔案路徑
    item.storeImg = "/static/uploads/stores/" + item.storeImg;

    // 處理時間
    // 格式化為 00:00:00
    // item.openTime = item.openTime
    //   .split(":")
    //   .slice(0, -1)
    //   .concat(["00"])
    //   .join(":");
    // item.closeTime = item.closeTime
    //   .split(":")
    //   .slice(0, -1)
    //   .concat(["00"])
    //   .join(":");
    // 格式化為 00:00
    item.openTime = item.openTime.split(":").slice(0, -1).join(":");
    item.closeTime = item.closeTime.split(":").slice(0, -1).join(":");

    // 處理店名
    let name = item.storeName.split(" ");
    item.storeName = name[0];
    item.storeBranchName = name[1];

    // 判斷是否為休息日
    // let today = moment().format("d"); // 2 (星期)

    // let isToday = JSON.parse(Object.values(item)[6]);
    // item.closeDay = isToday;
    // let day = isToday.filter((d) => d === 2);

    // let date1 = moment().format("LTS");
    // let date3 = moment().format("LT");
    // console.log(isToday);
  });

  // FIXME: 若沒有資料給前端會壞掉

  // 傳送使用者喜愛店家清單、喜愛店家 storeId 列表
  res.json({ userLikeStores, likeStoreIds });
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

module.exports = router;
