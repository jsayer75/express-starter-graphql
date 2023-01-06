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
    console.log("DATABASE connected successfully. \n");
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });

/**
 * Sync forcefully database with new models.
 */
// try {
//   (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//   })();
// } catch (error) {
//   console.error(error);
// }

module.exports = sequelize;
