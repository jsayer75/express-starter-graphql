const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashPassword(plaintextPassword) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plaintextPassword, salt);
  return hash;
}
// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash).catch((e) => {
    throw new Error(e);
  });
  return result;
}

function generateAccessToken(userInfo) {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "5m" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    console.log({ user });
    req.user = user;

    next();
  });
}

module.exports = {
  authenticateToken,
  comparePassword,
  generateAccessToken,
  hashPassword,
};
