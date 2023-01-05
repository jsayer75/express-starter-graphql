const express = require("express");
const usersRouter = require("./users.route");
const authRouter = require("./auth.route");

const app = express();

app.use("/users", usersRouter);
app.use("/auth", authRouter);

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

module.exports = app;
