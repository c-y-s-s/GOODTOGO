const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const router = express.Router();
//雜湊密碼用
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
//*api/auth/facebook
router.get("/facebook/token", async (req, res, next) => {});
//* 註冊：api/auth/register
router.get("/check", async (req, res, next) => {
  let [allEmails] = await connection.execute("SELECT email FROM users");
  let [allPhones] = await connection.execute("SELECT phone FROM users");
  res.json([allEmails, allPhones]);
});
router.post("/register", emailRule, passwordRule, async (req, res, next) => {
  console.log(req.body);
  //*確認格式是否正確
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = errors.array();
    console.log("validation:", error);
    // return res.status(400).json({ code: "33001", msg: error[0].msg });
    return res.status(400).json({ errors: error });
  }
  //*檢查 email 是不是已經註冊
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
  //*雜湊密碼
  let hashpassword = await argon2.hash(req.body.password);
  let createdTime = Date.now();
  console.log(createdTime);
  //*存入資料庫
  let [result] = await connection.execute(
    "INSERT INTO users (email, password, name, phone, valid) VALUES (?,?,?,?,?)",
    [req.body.email, hashpassword, req.body.name, req.body.phone, "1"]
  );
  console.log(result);
  res.json({ message: "ok" });
});
//Login with Google
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/oauth2/redirect/google",
//       scope: ["profile"],
//       state: true,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       db.get(
//         "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
//         ["https://accounts.google.com", profile.id],
//         function (err, row) {
//           if (err) {
//             return cb(err);
//           }
//           if (!row) {
//             connection.execute(
//               "INSERT INTO users (name) VALUES (?)",
//               [profile.displayName],
//               function (err) {
//                 if (err) {
//                   return cb(err);
//                 }
//                 var id = this.lastID;
//                 connection.execute(
//                   "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
//                   [id, "https://accounts.google.com", profile.id],
//                   function (err) {
//                     if (err) {
//                       return cb(err);
//                     }
//                     var user = {
//                       id: id,
//                       name: profile.displayName,
//                     };
//                     return cb(null, user);
//                   }
//                 );
//               }
//             );
//           } else {
//             db.get(
//               "SELECT rowid AS id, * FROM users WHERE rowid = ?",
//               [row.user_id],
//               function (err, row) {
//                 if (err) {
//                   return cb(err);
//                 }
//                 if (!row) {
//                   return cb(null, false);
//                 }
//                 return cb(null, row);
//               }
//             );
//           }
//         }
//       );
//     }
//   )
// );
// -------- 登入 --------
// /api/auth/login
router.post("/login", async (req, res, next) => {
  //TODO: 確認帳號是否存在
  let [members] = await connection.execute(
    "SELECT * FROM users WHERE email=?",
    [req.body.email]
  );
  console.log(members);
  if (members.length === 0) {
    //沒有查到這個email
    return res.status(404).send({
      code: "33003",
      msg: "尚未註冊",
    });
  }
  //TODO: 如果有這個帳號，再去比對密碼
  let member = members[0];
  //TODO: 密碼比對成功，記錄在session

  let result = await argon2.verify(member.password, req.body.password);
  if (!result) {
    //password not match
    return res.status(400).send({
      code: "33005",
      msg: "帳號或密碼錯誤",
    });
  }
  // 整理需要的資料
  let returnUser = {
    id: member.id,
    name: member.name,
    photo: member.headshots ? member.headshots : "",
  };
  console.log(returnUser);
  // 如果密碼比對成功，記錄在 session
  // 寫 session
  req.session.member = returnUser;

  res.json({
    code: "0",
    msg: "登入成功",
    data: returnUser,
  });
});
router.get("/logout", (req, res, next) => {
  req.session.member = null;
  res.sendStatus(202);
});
module.exports = router;
