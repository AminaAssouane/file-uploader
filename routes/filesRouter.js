const { Router } = require("express");
const filesController = require("../controllers/filesController");
const filesRouter = Router();
const ensureAuthenticated = require("../middleware/authMiddleware");

filesRouter.get("/files", ensureAuthenticated, filesController.listFilesByUser);
filesRouter.get(
  "/folders/:id/files",
  ensureAuthenticated,
  filesController.listFilesByFolder,
);
filesRouter.get("/files/:id", ensureAuthenticated, filesController.getFileById);
filesRouter.get("/files/:id/download", filesController.downloadFile);

module.exports = filesRouter;
