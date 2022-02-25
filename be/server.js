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
let authRouter = require("./routers/auth");
app.use("/api/auth", authRouter);

//  -------- 商家 RESTful API 列表 --------
let storesRouter = require("./routers/stores");
app.use("/api/stores", storesRouter);
// -------- 商家 RESTful API 列表 結束 --------

//  ------- 指定商家座標 RESTful API 列表 -------
let storesMapRouter = require("./routers/storemap");
app.use("/api/storesmap", storesMapRouter);
//  ------- 指定商家座標 RESTful API 結束 -------


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
let shoopingCarRouter = require("./routers/shoppingCar");
app.use("/api/shop", shoopingCarRouter);
// -------- 購物車商家資料 --------
// let shoopingCarStoreRouter = require("./routers/shoppingCar");
// app.use("/api/shop", shoopingCarStoreRouter);

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

// 

//  -------- 會員 RESTful API 列表 --------
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
