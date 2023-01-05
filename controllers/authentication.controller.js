const { saveUser } = require("../models/auth.model");
const {
  comparePassword,
  generateAccessToken,
  hashPassword,
} = require("../utils/auth.util");

async function signIn(req, res) {
  // TODO: Get Hash from database for req.body.email
  // `test` password hash: $2b$10$VAGcBtMcPfbmtyhLrGk0DO7Mlsn5npcHWPkyLSVLb036gA8DI9jlq
  const hash = "$2b$10$VAGcBtMcPfbmtyhLrGk0DO7Mlsn5npcHWPkyLSVLb036gA8DI9jlq";
  const passwordVerified = await comparePassword(req.body.password, hash);

  const token = await generateAccessToken({
    email: req.email,
    password: req.password,
  });

  res.json({ authToken: token, verified: passwordVerified });
}

async function signUp(req, res, next) {
  try {
    await hashPassword(req.body.password);
    saveUser(req);
    // TODO: Store hash in the database
    res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signIn, signUp };
