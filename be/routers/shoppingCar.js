// 引入 express
const express = require("express");
// 引入 express router
const router = express.Router();
const connection = require("../utils/db");
// /api/auth/register 這邊是因為先寫前端所以網址就要設定前端所設定的
router.post("/shoppingcar", async (req, res, next) => {
  //req.params 變數是在網址上
  //req.query ?xxx
  // body(form post) post用
  console.log(req.body);
  console.log(req.body.amount !== 0);
  if(req.body.products_id === "" || req.body.amount <=  0 ){
    return res.status(400).json({ code: "30001", msg: "ok" });
  }

   let [result] = await connection.execute(
     "INSERT INTO shopping_cart (products_id,amount)VALUES(?,?)",
     [req.body.products_id, req.body.amount]
   );
    










  res.json({ msg: "加入購物車成功" });
});

module.exports = router;
