const { Router } = require("express");
const foldersRouter = Router();
const foldersController = require("../controllers/foldersController");
const ensureAuthenticated = require("../middleware/authMiddleware");

foldersRouter.get("/", ensureAuthenticated, foldersController.listFolders);
foldersRouter.post("/", ensureAuthenticated, foldersController.createFolder);
foldersRouter.put("/:id", ensureAuthenticated, foldersController.renameFolder);
foldersRouter.delete(
  "/:id",
  ensureAuthenticated,
  foldersController.deleteFolder,
);

module.exports = foldersRouter;
