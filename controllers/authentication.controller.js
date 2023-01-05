const authModel = require("../models/auth.model");
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
    const hash = await hashPassword(req.body.password);
    const newUser = authModel.saveUser(req, hash);
    console.log({ newUser });

    res.json({ message: "OK", data: newUser });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signIn, signUp };
