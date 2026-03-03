const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/", fileController.homepage);

fileRouter.get("/signup", fileController.signUpGet);
fileRouter.post("/signup", fileController.signUpPost);

fileRouter.get("/login", fileController.loginGet);
fileRouter.post("/login", fileController.loginPost);

module.exports = fileRouter;
