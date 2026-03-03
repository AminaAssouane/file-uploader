const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/", fileController.homepage);

module.exports = fileRouter;
