const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  email: { type: DataTypes.TEXT, allowNull: false, unique: true },
  password: DataTypes.TEXT,
});

function saveUser(req, passwordHash) {
  const { email } = req.body;
  const newUser = User.build({ email, password: passwordHash });
  newUser.save();
  return newUser;
}

module.exports = {
  saveUser,
};
