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

// TODO: 會員登入後 先到 auth 比對帳密 -> 登入成功 -> 回應前端(登入頁) session 資料
// TODO: 登入成功後進到內頁 /member -> 利用 session 確認有無登入過 -> 進到其他路由中間件撈資料 profile/password...

// -------- 驗證是否已登入 中間件 --------
// TODO: router.use(checkLogin); // 最後要抽離成 middleware 引入
router.use((req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  //   req.session.member = {
  //     id: member.id,
  //     name: member.name,
  //     photo: member.logo
  //   }
  req.session.member = {
    id: 1,
    name: "添飯中式料理",
    // photo: "",
    logo: "/static/uploads/logo/test_logo.png",
  };
  // ----- 測試，假設已取得登入後的 session

  console.log("測試傳入id,name,logo", req.session.member);
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

// -------- 店家資料顯示 --------
// /api/member/profile (get)
router.get("/profile", async (req, res, next) => {
  let [data] = await connection.execute(
    "SELECT name, email, logo FROM stores WHERE id=?",
    [req.session.member.id]
  );
  console.log("db_stores id: ", req.session.member.id);
  console.log("取得 stores: ", data);

  // 打包資料給 res
  let profile = {
    name: data[0].name,
    email: data[0].email,
    logo: data[0].logo,
    // photo: data[0].headshots,
    logo: req.session.member.logo,
  };
  res.json(profile);
});

// -------- 商品清單資料顯示 --------
// /api/member/profile (get)
router.get("/productslist", async (req, res, next) => {
  let [productsData] = await connection.execute(
    "SELECT * FROM products WHERE store_id = ?",
    [req.session.member.id]
  );
  console.log("db_stores id: ", req.session.member.id);
  console.log("取得 stores: ", productsData);

  // 打包資料給 res
  // let profile = {
  //   name: data[0].name,
  //   price: data[0].price,
  // email: data[0].email,
  // logo: data[0].logo,
  // photo: data[0].headshots,
  // logo: req.session.member.logo,
  // };
  res.json(productsData);
});

router.get("/pagination", async (req, res, next) => {
  // req.params.stockId
  // req.query.page <- 第幾頁
  // /api/stock/:stockId?page=

  // 取得目前在第幾頁
  // 如果沒有設定 req.quyer.page，那就設成 1
  let page = req.query.page || 1;
  console.log("目前所在頁數：", page);

  // 取得目前的總筆數
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
    "SELECT * FROM products WHERE store_id=? ORDER BY created_at LIMIT ? OFFSET ?",
    [req.session.member.id, perPage, offset]
  );
  console.log("目前店家id", req.session.member.id);
  console.log("因該有3筆", perPage);
  console.log("33333333333", offset);

  // // 取得資料
  // let data = await stockModel.getPriceByCode(
  //   req.params.stockId,
  //   perPage,
  //   offset
  // );

  // 準備要 response
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
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
// -------- 會員密碼修改儲存 --------
// /api/member/password (post)
router.post("/productslistvalid", async (req, res, next) => {
  console.log("ddddd", req.body);

  // 檢查 req.body.password 密碼是否正確，正確才能改新密碼
  if (req.body.productValid === 1) {
    let [validResult] = await connection.execute(
      `UPDATE products SET valid=0 WHERE store_id=? AND id=?;`,
      [req.session.member.id, req.body.productId]
    );
  } else {
    let [validResult] = await connection.execute(
      `UPDATE products SET valid=1 WHERE store_id=? AND id=?;`,
      [req.session.member.id, req.body.productId]
    );
  }
  // 把會員資料從陣列中拿出來
  // let userPassword = passwordResult[0];
  console.log("11111111111111++++++++++++++", req.session.member.id);
  console.log("000000++++++++++++++", req.session.member);
  console.log("2222222++++++++++++++", req.body.productId);
  // 寫到這 先測試 是否能比對密碼成功(用前台送出表單測試)
  // 再進行後續儲存

  // // -------- 儲存到資料庫 --------
  // let [updatePasswordResult] = await connection.execute(
  //   `UPDATE users SET password=? WHERE id=?;`,
  //   [hashNewPassword, req.session.member.id]
  // );
  // console.log(updatePasswordResult);

  // 寫內容前先測試能不能得到 req
  // console.log("req.body: ", req.body);
  res.json({
    message: "儲存成功 ok",
  });
});

// -------- 會員店家收藏清單 --------
// /api/member/like (get)
router.get("/like", async (req, res, next) => {
  let [userLikeData] = await connection.execute(
    "SELECT * FROM user_like WHERE user_id=?",
    [req.session.member.id]
  );
  console.log("db_users id: ", req.session.member.id);
  console.log("取得 user Like Data: ", userLikeData);

  // 打包資料給 res
  // let userLike = {
  //   name: userLikeData[0].name,
  //   email: userLikeData[0].email,
  //   phone: userLikeData[0].phone,
  //   // photo: data[0].headshots,
  //   photo: req.session.member.photo,
  // };
  res.json(userLikeData);
});

module.exports = router;
