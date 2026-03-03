const prisma = require("../db/queries.js");
const bcrypt = require("bcryptjs");

function homepage(req, res) {
  res.render("index");
}

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

function loginGet(req, res) {
  res.render("login");
}

module.exports = { homepage, signUpGet, loginGet, signUpPost };
