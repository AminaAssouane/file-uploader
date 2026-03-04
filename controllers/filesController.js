const db = require("../db/queries");

async function listFilesByUser(req, res) {
  try {
    const userId = req.user.id;
    const files = await db.listFilesByUser(userId);
    res.render("files", { files });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch files");
  }
}

async function listFilesByFolder(req, res) {
  try {
    const userId = req.user.id;
    const folderId = Number(req.params.id);
    const files = await db.listFilesByFolder(folderId, userId);
    res.render("files", { files });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch files");
  }
}

async function getFileById(req, res) {
  try {
    const fileId = Number(req.params.id);
    const userId = req.user.id;
    const file = await db.getFileById(fileId, userId);
    if (!file) {
      return res.status(404).send("File not found or not authorized");
    }
    res.render("file", { file });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch file");
  }
}

module.exports = { listFilesByUser, listFilesByFolder, getFileById };
