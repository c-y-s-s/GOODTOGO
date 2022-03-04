const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
// express-validator 驗證
const { body, validationResult } = require("express-validator");
// multer 上傳圖片用
const multer = require("multer");
// bcrypt 雜湊密碼用
// const bcrypt = require("bcrypt");
const argon2 = require("argon2");

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

  router.post(
    "/storeCheck",
    uploader.single("storeLogo"),
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
  
      // 檢查 email 是不是非原本使用者、已經註冊
      let [members] = await connection.execute(
        "SELECT * FROM users WHERE email=?",
        [req.body.email]
        // req.body (form post 的物件 裡面的 email)
      );
      // console.log("有沒有此 email", members); // [] 空的 -> 沒有此email -> 可以註冊
      // console.log("有沒有此 email id", members[0].id);
      // console.log("此使用者登入的 id", req.session.member.id);
      if (members.length > 0 ) {
        // 表示有查到此 email 且不是使用者原本的 email -> 註冊過了
        return res.status(400).send({
          // send? json?
          code: "33002",
          msg: "這個 email 已經註冊過了",
        });
      }
  
      // 到這邊表示前面沒錯誤了 (所有資料驗證ok、email尚未被註冊)
  
      // 處理圖片
      console.log("前端送來、multer中間件處理過 req.file: ", req.file);
      let hashpassword = await argon2.hash(req.body.password);

      let filename = "/static/uploads/headshots/" + req.file.filename;
      console.log("加上路徑的 filename: ", filename);
  
      // -------- 儲存到資料庫 --------
      let [updateProfileResult] = await connection.execute(
        `INSERT INTO stores bossname, name, email, account, password, tel_no, address, open_time, close_time, certification-img, logo, valid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`,
        [
            req.body.name,
            req.body.storeName,
            req.body.email,
            req.body.email,
            hashpassword,
            req.body.phone,
            req.body.address,
            req.body.openTime,
            req.body.closeTime,
            filename,
            filename,
            "1"
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
module.exports = router;
