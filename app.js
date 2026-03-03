const express = require("express");
const path = require("node:path");
const fileRouter = require("./routes/fileRouter");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");
const prisma = require("./db/prisma.js");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
require("dotenv").config();

const app = express();

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "cats",
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      modelName: "Session",
    }),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use("/", (req, res) => {
  res.send(process.env.DATABASE_URL);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occured : ", error);
  else console.log(`Listening on port : ${PORT}`);
});
