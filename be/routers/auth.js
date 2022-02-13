const express = require("express");
const router = express.Router();
const argon = require("argon2");
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

  // console.log(users);
  //TODO:雜湊密碼
  //TODO:存入資料庫
  res.json({ message: "ok" });
});
module.exports = router;
