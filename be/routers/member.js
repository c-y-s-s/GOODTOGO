const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

// 會員登入後 先到 auth 比對帳密 -> 登入成功 -> 回應前端(登入頁) session 資料
// 登入成功後進到內頁 /member -> 利用 session 確認有無登入過 -> 進到其他路由中間件撈資料 profile/password...

// /api/member
router.get("/", (req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  // req.session.member = {
  //   id: member.id,
  //   name: member.name,
  //   photo: member.photo
  // }
  req.session.member = {
    id: 1,
    name: 倪振軒,
    photo: "",
  };
  // ----- 測試，假設已取得登入後的 session

  // 有無 session
  if (req.session.member) {
    // 表示登入過
    res.json(req.session.member);
  } else {
    // 表示尚未登入
    res.status(400).json({
      code: "99001",
      msg: "會員未登入",
    });
  }
  // 到這裡，表示 req.session.member 一定有資料
  next(); // 往下走讓 其他頁撈資料
  // res.json(req.session.member); // 先測試看看前端能不能得到 session
});

// /api/member/profile
// 會員資料修改頁 - 資料顯示於 profile
router.get("/profile", async (req, res, next) => {
  // ----- 測試，假設已取得登入後的 session
  req.session.member = {
    id: 1,
    name: "倪振軒",
    photo: "",
  };
  // ----- 測試，假設已取得登入後的 session

  let [data] = await connection.execute(
    "SELECT name, email, phone, headshots FROM users WHERE id=?",
    [req.session.member.id]
  );
  console.log("id=", req.session.member.id);
  console.log("取得 user:", data);
  res.json(data);
});

// /api/member/profile/edit
// 會員資料修改頁 - 會員編輯資料後，寫入資料庫
// router.post("/profile/edit", async (req, res, next) => {
//   let [data, fields] = await connection.execute("SELECT * FROM users");
//   // console.log(data);
//   res.json(data);
// });

module.exports = router;
