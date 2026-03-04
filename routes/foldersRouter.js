const { Router } = require("express");
const foldersRouter = Router();
const foldersController = require("../controllers/foldersController");
const ensureAuthenticated = require("../middleware/authMiddleware");

foldersRouter.get(
  "/folders",
  ensureAuthenticated,
  foldersController.listFolders,
);
foldersRouter.post(
  "/folders",
  ensureAuthenticated,
  foldersController.createFolder,
);
foldersRouter.put(
  "/folders/:id",
  ensureAuthenticated,
  foldersController.renameFolder,
);
foldersRouter.delete(
  "/folders/:id",
  ensureAuthenticated,
  foldersController.deleteFolder,
);

module.exports = foldersRouter;
