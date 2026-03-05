const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport.js");

// HOME
function homepage(req, res) {
  const user = req.user;
  res.render("index", { user });
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

    const newUser = await db.createUser({
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

// LOGIN
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

// UPLOAD
function uploadGet(req, res) {
  res.render("upload");
}
function uploadPost(req, res) {
  console.log(req.file);
  res.redirect("/");
}

// LOGOUT
function logout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  homepage,
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  uploadGet,
  uploadPost,
  logout,
};
