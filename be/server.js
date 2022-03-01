//引用 express 框架
const express = require("express");
//引用 dotenv 套件
require("dotenv").config();
//引用 express 內建框架 path
const path = require("path");
// 引用 cors 套件解決瀏覽器同源問題
const cors = require("cors");
//引用express-session、session-file-store 來儲存資料
const session = require("express-session");
let FileStore = require("session-file-store")(session);

let app = express();

app.use(express.urlencoded({ extended: true }));
//要讓express認得json
app.use(express.json());

//使用 cors 設定的中間鍵，開放所有網域皆可連線
// app.use(cors());
app.use(
  cors({
    // 為了要讓 browser 在 CORS 的情況下還是幫我們送 cookie
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  session({
    store: new FileStore({
      path: path.join(__dirname, "..", "sessions"),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// -------- 會員註冊、登入API --------
let checkMemberRouter = require("./routers/checkMember");
app.use("/api/checkMember", checkMemberRouter);

let authRouter = require("./routers/auth");
app.use("/api/auth", authRouter);

// :TODO: -------- 商家 RESTful API 列表 --------
let storesRouter = require("./routers/stores");
app.use("/api/stores", storesRouter);
//推薦商家
let storeRecommRouter = require("./routers/storeRecomm");
app.use("/api/storeRecommRouter", storeRecommRouter);
// let storeFilterRouter = require("./routers/storeFilter");
// app.use("/api/storeFilter", storeFilterRouter);
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
app.use("/api/users", memberRouter);
// -------- 會員 RESTful API 列表 --------

// 404
app.use((req, res, next) => {
  res.status(404).send("404");
});

//引用 env 檔裡的 Port 號 ， 建立 server
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server啟用，運行在 port : ${port}`);
});
