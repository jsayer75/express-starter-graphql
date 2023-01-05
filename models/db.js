const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/journey`
// );

// const sequelize = new Sequelize(
//   "postgres://postgres:postgres@localhost:5432/journey"
// );

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
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("Connection error");
  });

module.exports = sequelize;
