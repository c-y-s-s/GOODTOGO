const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const connection = require("../utils/db");

//-------- 後端驗證套件 express-validator --------
const { body, validationResult } = require("express-validator");

const emailRule = [body("email").isEmail().withMessage("email欄位格式錯誤")];
const passwordRule = [
  body("password").trim().isLength({ min: 6 }).withMessage("密碼長度至少為6"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      return value == req.body.password;
    })
    .withMessage("兩次輸入的密碼不相同"),
];

// -------- 商家登入 --------

// /api/storeLogin
router.post("/", async (req, res, next) => {
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

  res.json({
    code: "0",
    msg:"後端登入成功",
    data: returnStore,
  });
});
module.exports = router;
