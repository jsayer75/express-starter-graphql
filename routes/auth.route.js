var express = require("express");
const { signIn, signUp } = require("../controllers/authentication.controller");

var router = express.Router();

/* Signup Request */
router.post("/", signUp);

/* Signin Request */
router.post("/signin", signIn);

module.exports = router;
