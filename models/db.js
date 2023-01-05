const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "journey",
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

module.exports = sequelize;
