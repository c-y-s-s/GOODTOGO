const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM stores");
  // console.log(data);
  res.json(data);
});


module.exports = router;