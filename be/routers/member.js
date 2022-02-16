const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
// express-validator 驗證
const { body, validationResult } = require("express-validator");
// multer 上傳圖片用
const multer = require("multer");

// TODO: 會員登入後 先到 auth 比對帳密 -> 登入成功 -> 回應前端(登入頁) session 資料
// TODO: 登入成功後進到內頁 /member -> 利用 session 確認有無登入過 -> 進到其他路由中間件撈資料 profile/password...

// -------- 驗證是否已登入 中間件 --------
router.use((req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  // req.session.member = {
  //   id: member.id,
  //   name: member.name,
  //   photo: member.photo
  // }
  req.session.member = {
    id: 1,
    name: "倪振軒",
    photo: "/static/uploads/headshots/member-1644765422913.png",
  };
  // ----- 測試，假設已取得登入後的 session

  // 有無 session
  if (req.session.member) {
    // 表示登入過
    // next(); // 這樣會跳出 router 到 server.js 繼續 next()???
  } else {
    // 表示尚未登入
    res.status(400).json({
      code: "99001",
      msg: "會員未登入",
    });
  }

  // 到這裡，表示 req.session.member 一定有資料
  next(); // 往下走讓 其他頁撈資料
  // res.json(req.session.member); // 先測試看看前端能不能得到 session
});
// -------- 驗證是否已登入 中間件 結束 --------

// 檢查要 update 的資料是否符合格式 中間件
const updateRules = [
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
  updateRules, // 驗證更新資料中間件

  async (req, res, next) => {
    // express-validator 驗證結果 回傳錯誤訊息
    const validateResult = validationResult(req);
    if (!validateResult.isEmpty()) {
      // 驗證結果有問題
      let error = validateResult.mapped();
      // 錯誤驗證結果轉為 array / mapped 方便取得錯誤結果
      console.log("validateResult(error): ", error); // 測試錯誤訊息是否會出現
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
      ? "/static/uploads/" + req.file.filename
      : req.session.member.photo;
    console.log("加上路徑的 filename: ", filename);

    // -------- 儲存到資料庫 --------
    let [result] = await connection.execute(
      "UPDATE users SET name=?, email=?, phone=?, headshots=? WHERE id=?",
      [
        req.body.name,
        req.body.email,
        req.body.phone,
        filename,
        req.session.member.id,
      ]
    );
    console.log(result);

    // 寫內容前先測試能不能得到 req
    // console.log("req.body: ", req.body);
    res.json({ message: "儲存資料 ok" });
  }
);

module.exports = router;
