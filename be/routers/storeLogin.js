const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const path = require("path");
// const { body, validationResult } = require("express-validator");

const argon2 = require("argon2");

// -------- 商家登入 --------

router.post(
  "/storeLogin", async (req, res, next) => {
  //to confirm if the mail exists
  let [stores] = await connection.execute("SELECT * FROM stores WHERE email=?", [
    req.body.email,
  ]);
  console.log(stores);
  if (stores.length === 0) {
    //mail not fount
    return res.status(404).send({
      code: "33003",
      msg: "尚未註冊",
    });
  }
  let store = stores[0];

  let result = await argon2.verify(store.password, req.body.password);
  if (!result) {
    //password not match
    return res.status(400).send({
      code: "33005",
      msg: "帳號或密碼錯誤",
    });
  }
  let returnStore = {
    id: store.id,
    name: store.name,
  };
// session
  req.session.store = returnStore;
  console.log("商家session長這樣", req.session.store);

  res.json({
    code: "0",
    msg:"後端登入成功",
    data: returnStore,
  });
});
module.exports = router;
