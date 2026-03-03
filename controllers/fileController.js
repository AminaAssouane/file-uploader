const prisma = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");

// HOME
function homepage(req, res) {
  res.render("index");
}

// SIGN UP
function signUpGet(req, res) {
  res.render("signup");
}
async function signUpPost(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.createUser({
      name,
      email,
      password: hashedPassword,
    });
    console.log("Created user:", newUser);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
}

//LOGIN
function loginGet(req, res) {
  res.render("login");
}
function loginPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log("Login failed:", info.message);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      console.log("Login successful for:", user.email);
      return res.redirect("/");
    });
  })(req, res, next);
}
/*
function loginPost(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}*/

module.exports = { homepage, signUpGet, signUpPost, loginGet, loginPost };
