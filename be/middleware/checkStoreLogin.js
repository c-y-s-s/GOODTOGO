// auth middleware

let checkStoreLogin = (req, res, next) => {
    if (req.session.store) {
      next();
    } else {
      res.status(400).json({ code: "99999", msg: "尚未登入" });
    }
  };
  
  module.exports = { checkStoreLogin };
  