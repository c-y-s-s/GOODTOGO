const express = require("express");
const router = express.Router();
const path = require("path");
// 連接資料庫
const connection = require("../utils/db");
// multer 上傳圖片用
const multer = require("multer");

// 設定上傳圖片儲存資訊 (資料夾、檔名)
const storage = multer.diskStorage({
  // 設定儲存的目的地(硬碟->檔案夾)
  destination: function (req, file, cb) {
    // ../public/uploads/headshots <-- 檔案夾要自己先建立好
    cb(null, path.join(__dirname, "..", "public", "uploads", "products"));
    // 錯誤訊息 先給null
  },
  // 設定儲存的檔名
  filename: function (req, file, cb) {
    console.log("multer-filename: ", file);
    // 抓使用者上傳的檔名 file.originalname
    // 取用副檔名 ext
    const ext = file.originalname.split(".").pop();
    // 組合要放進資料夾(、資料庫)的名稱
    cb(null, `product-${Date.now()}.${ext}`);
  },
});

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
    fileSize: 2000 * 1024, // 限制 < 200K
  },
});

router.post("/newproduct", uploader.single("img"), async (req, res, next) => {
  console.log(req.body);

  let filename = req.file
    ? "/static/uploads/products/" + req.file.filename
    : req.body.img;
  console.log("req.file", req.file);
  console.log("req.file.filename", req.file.filename);
  console.log("加上路徑的 filename: ", filename);

  //*存入資料庫
  let [result] = await connection.execute(
    `INSERT INTO products (store_id,
      category_id,
      name,
      img,
      price,
      amount,
      description,
      start_time,
      due_time,
      created_at,
      valid) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      req.body.store_id,
      req.body.category_id,
      req.body.name,
      filename,
      req.body.price,
      req.body.amount,
      req.body.description,
      req.body.start_time,
      req.body.due_time,
      req.body.created_at,
      "1",
    ]
  );
  // console.log(result);
  res.json({ message: "ok" });
});

module.exports = router;
