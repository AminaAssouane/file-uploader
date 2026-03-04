const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("./config/passport");
require("./config/passport");
const prisma = require("./db/prisma.js");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
require("dotenv").config();
const authRouter = require("./routes/authRouter");
const foldersRouter = require("./routes/foldersRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", foldersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error("Error occured : ", error);
  else console.log(`Listening on port : ${PORT}`);
});
