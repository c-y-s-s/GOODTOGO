const express = require("express");
const router = express.Router();
const { checkStoreLogin } = require("../middleware/checkStoreLogin");
// "/api/checkStoreMember"
router.use(checkStoreLogin);

// "/api/checkStoer/info"
router.get("/", (req, res, next) => {
  // 因為有用了 checkLogin 這個我們自己寫的中間件
  // 能走到這裡，表示 req.session.user 一定有資料
  res.json(req.session.store);
});

module.exports = router;
