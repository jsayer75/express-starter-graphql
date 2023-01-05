var express = require("express");
const {
  generateAccessToken,
  hashPassword,
  comparePassword,
} = require("../controllers/authentication");

var router = express.Router();

/* Signup Request */
router.post("/", function (req, res, next) {
  try {
    hashPassword(req.body.password);
    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
  }
});

/* Signup Request */
router.post("/signin", async function (req, res, next) {
  // TODO: Get Hash from database for req.body.email
  // `test` password hash: $2b$10$VAGcBtMcPfbmtyhLrGk0DO7Mlsn5npcHWPkyLSVLb036gA8DI9jlq
  const hash = "$2b$10$VAGcBtMcPfbmtyhLrGk0DO7Mlsn5npcHWPkyLSVLb036gA8DI9jlq";
  const passwordVerified = await comparePassword(req.body.password, hash);

  const token = await generateAccessToken({
    email: req.email,
    password: req.password,
  });

  res.json({ authToken: token, verified: passwordVerified });
});

module.exports = router;
