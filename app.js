const express = require("express");
const path = require("node:path");
const fileRouter = require("./routes/fileRouter");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const app = express();

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", fileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occured : ", error);
  else console.log(`Listening on port : ${PORT}`);
});
