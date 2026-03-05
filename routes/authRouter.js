const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const upload = require("../config/multer");
const ensureAuthenticated = require("../middleware/authMiddleware");

authRouter.get("/", authController.homepage);

authRouter.get("/signup", authController.signUpGet);
authRouter.post("/signup", authController.signUpPost);

authRouter.get("/login", authController.loginGet);
authRouter.post("/login", authController.loginPost);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
