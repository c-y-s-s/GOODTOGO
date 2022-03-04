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


// /api/auth/register
router.post("/register", emailRule, passwordRule, async (req, res, next) => {
  console.log(req.body);
  //TODO: 確認格式是否正確
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = errors.array();
    console.log("validation:", error);
    // return res.status(400).json({ code: "33001", msg: error[0].msg });
    return res.status(400).json({ errors: error });
  }
  // //TODO:檢查 email 是不是已經註冊
  let [members] = await connection.execute(
    "SELECT * FROM users WHERE email=?",
    [req.body.email]
  );
  console.log(members);
  if (members.length > 0) {
    return res.status(400).send({
      code: "33002",
      msg: "這個 email 已經已經註冊過了",
    });
  }
  //TODO:雜湊密碼
  let hashpassword = await argon2.hash(req.body.password);

  //TODO:存入資料庫
  let [result] = await connection.execute(
    "INSERT INTO users (email, password, name, phone, valid) VALUES (?,?,?,?,?)",
    [req.body.email, hashpassword, req.body.name, req.body.phone, "1"]
  );
  console.log(result);
  res.json({ message: "ok" });
});

// /api/auth/storeCheck
// router.post("/storeCheck", emailRule, passwordRule, async (req, res, next) => {
//   console.log(req.body);
//   //check if req is valid
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     let error = errors.array();
//     console.log("validation:", error);
//     // return res.status(400).json({ code: "33001", msg: error[0].msg });
//     return res.status(400).json({ errors: error });
//   }
//   // check if mail is registered
//     let [stores] = await connection.execute(
//     "SELECT * FROM stores WHERE email=?",
//     [req.body.email]
//   );
//   console.log(stores);
//   if (stores.length > 0) {
//     return res.status(400).send({
//       code: "33002",
//       msg: "這個 email 已經已經註冊過了",
//     });
//   }

//   // hash password

//   let hashpassword = await argon2.hash(req.body.password);

//   let [result] = await connection.execute(
//     // todo 修改checkbox and open time input
//   "INSERT INTO stores (bossname, name, email, account, tel_no, password,valid) VALUES (?,?,?,?,?,?,?)",
//     [req.body.name, req.body.storeName, req.body.email, req.body.email, req.body.storephone, hashpassword, "1"]
//   );
//   console.log(result);
//   res.json({ message: "ok" });
// });


// -------- 登入 --------

// /api/auth/login
router.post("/login", async (req, res, next) => {
  //TODO: 確認帳號是否存在
  let [users] = await connection.execute("SELECT * FROM users WHERE email=?", [
    req.body.email,
  ]);
  console.log(users);
  if (users.length === 0) {
    //沒有查到這個email
    return res.status(404).send({
      code: "33003",
      msg: "尚未註冊",
    });
  }
  //TODO: 如果有這個帳號，再去比對密碼
  let user = users[0];
  //TODO: 密碼比對成功，記錄在session

  let result = await argon2.verify(user.password, req.body.password);
  if (!result) {
    //password not match
    return res.status(400).send({
      code: "33005",
      msg: "帳號或密碼錯誤",
    });
  }
  // 整理需要的資料
  let returnUser = {
    id: user.id,
    name: user.name,
    photo: user.photo,
  };

  // 如果密碼比對成功，記錄在 session
  // 寫 session
  req.session.user = returnUser;

  res.json({
    code: "0",
    data: returnUser,
  });
});

// -------- 商家登入 --------

// /api/auth/storeLogin
// router.post("/storeLogin", async (req, res, next) => {
//   //to confirm if the mail exists
//   let [stores] = await connection.execute("SELECT * FROM stores WHERE email=?", [
//     req.body.email,
//   ]);
//   console.log(stores);
//   if (stores.length === 0) {
//     //mail not fount
//     return res.status(404).send({
//       code: "33003",
//       msg: "尚未註冊",
//     });
//   }
//   let store = stores[0];

//   let result = await argon2.verify(store.password, req.body.password);
//   if (!result) {
//     //password not match
//     return res.status(400).send({
//       code: "33005",
//       msg: "帳號或密碼錯誤",
//     });
//   }
//   let returnStore = {
//     id: store.id,
//     name: store.name,
//   };
// // session
//   req.session.store = returnStore;

//   res.json({
//     code: "0",
//     msg:"後端登入成功",
//     data: returnStore,
//   });
// });


module.exports = router;
