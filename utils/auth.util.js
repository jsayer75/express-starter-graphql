const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function hashPassword(plaintextPassword) {
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(plaintextPassword, salt, (err, hash) => {
      // TODO: Store hash in the database
      console.log({ hash });
    });
  });
}
// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash).catch((e) => {
    throw new Error(e);
  });
  return result;
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1m" });
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
