const prisma = require("../db/queries.js");

function homepage(req, res) {
  res.render("index");
}

function signUpGet(req, res) {
  res.render("signup");
}
async function signUpPost(req, res) {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.createUser({ name, email });
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
