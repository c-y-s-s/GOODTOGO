//引用 express 框架
const express = require("express");
//引用 dotenv 套件
require("dotenv").config();
//引用 express 內建框架 path
const path = require("path");
// 引用 cors 套件解決瀏覽器同源問題
const cors = require("cors");

let app = express();

//使用 cors 設定的中間鍵，開放所有網域皆可連線
app.use(
  cors({
    // 為了跨源存取 cookie，讓 browser 在 CORS 的情況下還是幫我們送 cookie
    origin: ["http://localhost:3000"], // 請求來源為前端
    credentials: true, // 要設 credentials 就要設來源 origin
  })
);

// 要讓 express 認得 body
app.use(express.urlencoded({ extended: true }));
// 要讓 express 認得 json
app.use(express.json());

// 啟用 session (預設存在記憶體)
const expressSession = require("express-session");
// 為使 session 存硬碟
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    // 將 session 存硬碟
    store: new FileStore({
      path: path.join(__dirname, "..", "sessions"),
      // 記得 sessions 檔案夾先建好
    }),
    // secret: 加密的 key
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// -------- 靜態圖片 --------
app.use("/static", express.static(path.join(__dirname, "public")));


// :TODO: -------- 商家 RESTful API 列表 --------
let storesRouter = require("./routers/stores");
app.use("/api/stores", storesRouter);
// -------- 商家 RESTful API 列表 結束 --------

// :TODO: -------- 商品 RESTful API 列表 --------
let productsRouter = require("./routers/products");
app.use("/api/products", productsRouter);
// -------- 商品 RESTful API 列表 結束 --------

// :TODO: -------- 商品評論 RESTful API 列表 --------
let productsCommitRouter = require("./routers/productsCommit");
app.use("/api/productscommit", productsCommitRouter);
// -------- 商品評論 RESTful API 列表 結束 --------

// :TODO: -------- 會員 RESTful API 列表 --------
let memberRouter = require("./routers/member");
app.use("/api/member", memberRouter);
// -------- 會員 RESTful API 列表 --------

// :TODO: -------- 商家後台 RESTful API 列表 --------
let storebgRouter = require("./routers/storebg");
app.use("/api/storebg", storebgRouter);
// -------- 商家後台 RESTful API 列表 --------

// -------- 商家後台寫入資料 --------
let storeBgAddProduct = require("./routers/storeBgAddProduct");
app.use("/api/storebgaddproduct", storeBgAddProduct);

// 404
app.use((req, res, next) => {
  res.status(404).send("404");
});

//引用 env 檔裡的 Port 號 ， 建立 server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server啟用，運行在 port : ${port}`);
});