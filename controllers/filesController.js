const db = require("../db/queries");
const path = require("path");
const fs = require("fs");

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
// DOWNLOAD
async function downloadFile(req, res) {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await db.getFileById(fileId, userId);

    if (!file) {
      return res.status(404).send("File not found");
    }

    const filePath = path.resolve(file.path); // absolute path
    if (!fs.existsSync(filePath)) {
      return res.status(404).send("File missing on server");
    }

    res.download(filePath, file.name); // sends the file to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not download file");
  }
}

// UPLOAD
async function uploadGet(req, res) {
  try {
    const userId = req.user.id;
    const folders = await db.listFolders(userId);
    res.render("upload", { folders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not load upload page");
  }
}
async function uploadPost(req, res) {
  try {
    const userId = req.user.id;
    const folderId = req.body.folderId || null;

    // req.file contains file info
    console.log(req.file);

    // Save file metadata in DB
    await db.createFile({
      name: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      userId,
      folderId,
    });

    res.redirect("/files");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file");
  }
}

module.exports = {
  listFilesByUser,
  listFilesByFolder,
  getFileById,
  downloadFile,
  uploadGet,
  uploadPost,
};
