const { Router } = require("express");
const filesController = require("../controllers/filesController");
const filesRouter = Router();
const ensureAuthenticated = require("../middleware/authMiddleware");
const upload = require("../config/multer");

filesRouter.get("/files", ensureAuthenticated, filesController.listFilesByUser);
filesRouter.get(
  "/folders/:id/files",
  ensureAuthenticated,
  filesController.listFilesByFolder,
);
filesRouter.get("/files/:id", ensureAuthenticated, filesController.getFileById);
filesRouter.get("/files/:id/download", filesController.downloadFile);

// Upload file to a folder
filesRouter.get("/upload", ensureAuthenticated, filesController.uploadGet);
filesRouter.post(
  "/upload",
  ensureAuthenticated,
  upload.single("file"), // name must match <input name="file">
  filesController.uploadPost,
);

module.exports = filesRouter;
