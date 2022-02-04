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
app.use(cors());




// :TODO: -------- 商家 RESTful API 列表 --------
let storesRouter = require("./routers/stores");
app.use("/api/stores", storesRouter);
// -------- 商家 RESTful API 列表 結束 --------

// :TODO: -------- 商品 RESTful API 列表 --------
let productsRouter = require("./routers/products");
app.use("/api/products", productsRouter);
// -------- 商品 RESTful API 列表 結束 --------

// :TODO: -------- 會員 RESTful API 列表 --------
let memberRouter = require("./routers/member");
app.use("/api/users", memberRouter);
// -------- 會員 RESTful API 列表 --------

// 404
app.use((req, res, next) => {
  res.status(404).send("404");
});

//引用 env 檔裡的 Port 號 ， 建立 server
const port = 3001 || 3000;
app.listen(port, () => {
  console.log(`Server啟用，運行在 port : ${port}`);
});