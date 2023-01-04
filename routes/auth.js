var express = require("express");
var router = express.Router();

/* Signup Request */
router.post("/", function (req, res, next) {
  res.send("ok");
});

/* Signup Request */
router.post("/signin", function (req, res, next) {
  res.send("ok");
});

module.exports = router;
