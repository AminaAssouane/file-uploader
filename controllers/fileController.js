function homepage(req, res) {
  res.render("index");
}

function signUpGet(req, res) {
  res.render("signup");
}

function loginGet(req, res) {
  res.render("login");
}

module.exports = { homepage, signUpGet, loginGet };
