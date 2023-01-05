const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
});

User.sync();

function saveUser(req, passwordHash) {
  const { email } = req.body;
  const newUser = User.build({ email, password: passwordHash });
  newUser.save();
  return newUser;
}

module.exports = {
  saveUser,
};
