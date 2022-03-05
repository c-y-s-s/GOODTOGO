// 引用 express 框架
const express = require("express");
// 引用 dotenv 套件
require("dotenv").config();
// path 是 nodejs 內建的 lib
const path = require("path");
// 引用 cors 套件解決瀏覽器同源問題
const cors = require("cors");
//引用express-session、session-file-store 來儲存資料
const session = require("express-session");
// let FileStore = require("session-file-store")(session);
// const cookieSession = require("cookie-session");
const passport = require("passport");
require("./config/passport")(passport);

let app = express();
app.use(express.urlencoded({ extended: true }));
//要讓express認得json
app.use(express.json());

app.use;
//使用 cors 設定的中間鍵，開放所有網域皆可連線
// app.use(cors()); // 全開
// 跨源 cookie 要設定 可接收的請求來源(前端)
app.use(
  cors({
    // 為了跨源存取 cookie，讓 browser 在 CORS 的情況下還是幫我們送 cookie
    origin: ["http://localhost:3000"], // 請求來源為前端
    credentials: true, // 要設 credentials 就要設來源 origin
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

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

// app.use(
//   cookieSession({
//     name: "session",
//     keys: process.env.SESSION_SECRET,
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
// app.use(passport.authenticate("session"));
// -------- 靜態圖片 --------
app.use("/static", express.static(path.join(__dirname, "public")));

// -------- 會員註冊、登入API --------
let checkMemberRouter = require("./routers/checkMember");
let authRouter = require("./routers/auth");

app.use("/api/checkMember", checkMemberRouter);
app.use("/api/auth", authRouter);

//  -------- 商家 RESTful API 列表 --------
let storesRouter = require("./routers/stores");
app.use("/api/stores", storesRouter);
//推薦商家
let storeRecommRouter = require("./routers/storeRecomm");
app.use("/api/storeRecommRouter", storeRecommRouter);
// let storeFilterRouter = require("./routers/storeFilter");
// app.use("/api/storeFilter", storeFilterRouter);
// -------- 商家 RESTful API 列表 結束 --------

//  ------- 指定商家座標 RESTful API 列表 -------
let storesMapRouter = require("./routers/storemap");
app.use("/api/storesmap", storesMapRouter);
//  ------- 指定商家座標 RESTful API 結束 -------
// -------- MAP --------
let mapRouter = require("./routers/map");
app.use("/api/map", mapRouter);

// -------- 商品 RESTful API 列表 --------
let productsRouter = require("./routers/products");
app.use("/api/products", productsRouter);
// -------- 商品 RESTful API 列表 結束 --------

//  -------- 商家評價排序由多至少 --------
let productsCommentStarDesc = require("./routers/productsCommentStarDesc");
app.use("/api/productscommentstardesc", productsCommentStarDesc);
//  -------- 商家評價排序由少置多 --------
let productsCommentStarAsc = require("./routers/productsCommentStarAsc");
app.use("/api/productscommentstarasc", productsCommentStarAsc);

//  -------- 商家評價留言時間由遠到近 --------
let productsCommentTimeAsc = require("./routers/productsCommentTimeAsc");
app.use("/api/productscommenttimeasc", productsCommentTimeAsc);

//  -------- 購物車資料 --------
let shoopingCarRouter = require("./routers/shoppingCart");
app.use("/api/shop", shoopingCarRouter);
// -------- 購物車商家資料 --------
// let shoopingCarStoreRouter = require("./routers/shoppingCar");
// app.use("/api/shop", shoopingCarStoreRouter);

// -------- 訂單資料 --------
let checkOutRouter = require("./routers/checkout");
app.use("/api/checkout", checkOutRouter);

//  -------- 指定商品 RESTful API 列表 --------
// 先分開寫 等會設定api變數之後寫再跟上面寫一起
let productRouter = require("./routers/productsModal");
app.use("/api/product", productRouter);
// -------- 商品 RESTful API 列表 結束 --------

// -------- 指定商家所有評論  RESTful API --------
// ! 商家個人頁面評價所用 因為頁數版會有誤差 必須撈出所有資料去做計算
let storeCommentTotal = require("./routers/storeCommentTotal");
app.use("/api/storecommittotal", storeCommentTotal);
// -------- 指定商家所有評論  RESTful API 結束  --------

//  -------- 商品評論做頁數處理 RESTful API 列表 --------
let productsCommentRouter = require("./routers/productsCommentPage");
app.use("/api/productscommit", productsCommentRouter);
// -------- 商品評論 RESTful API 列表 結束 --------

//  -------- 指定商品評論 RESTful API 列表 --------
let productsDesignateCommitRouter = require("./routers/productsModalCommit");
app.use("/api/productsdesignatecommit", productsDesignateCommitRouter);
// -------- 指定商品評論 RESTful API 列表 結束 --------
//  -------- 會員 RESTful API 列表 --------
let memberRouter = require("./routers/member");
app.use("/api/member", memberRouter);
// -------- 會員 RESTful API 列表 --------

// 404
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

// 設置 port || 預設值
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server啟用，運行在 port : ${port}`);
});
