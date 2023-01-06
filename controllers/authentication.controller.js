const authModel = require("../models/auth.model");
const {
  comparePassword,
  generateAccessToken,
  hashPassword,
} = require("../utils/auth.util");

async function signIn(req, res) {
  // TODO: Error Handling: https://expressjs.com/en/guide/error-handling.html
  // email not found or password incorrect
  try {
    const { password } = req.body;
    console.log({ password });
    const user = await authModel.getUser(req);
    const passwordVerified = await comparePassword(password, user.password);
    const token = await generateAccessToken({
      email: req.email,
      password: req.password,
    });

    res.json({ authToken: token, verified: passwordVerified });
  } catch (error) {
    console.log({ error });
    return res;
  }
}

async function signUp(req, res, next) {
  try {
    const hash = await hashPassword(req.body.password);
    const newUser = authModel.saveUser(req, hash);

    res.json({ message: "OK", data: newUser });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signIn, signUp };
