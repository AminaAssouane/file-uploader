const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const upload = require("../config/multer");
const ensureAuthenticated = require("../middleware/authMiddleware");

fileRouter.get("/", fileController.homepage);

fileRouter.get("/signup", fileController.signUpGet);
fileRouter.post("/signup", fileController.signUpPost);

fileRouter.get("/login", fileController.loginGet);
fileRouter.post("/login", fileController.loginPost);

fileRouter.get("/upload", ensureAuthenticated, fileController.uploadGet);
fileRouter.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file"),
  fileController.uploadPost,
);

module.exports = fileRouter;
