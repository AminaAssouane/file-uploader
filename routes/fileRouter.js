const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const upload = require("../config/multer");

fileRouter.get("/", fileController.homepage);

fileRouter.get("/signup", fileController.signUpGet);
fileRouter.post("/signup", fileController.signUpPost);

fileRouter.get("/login", fileController.loginGet);
fileRouter.post("/login", fileController.loginPost);

fileRouter.get("/upload", fileController.uploadGet);
fileRouter.post("/upload", upload.single("file"), fileController.uploadPost);

module.exports = fileRouter;
