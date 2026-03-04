const db = require("../db/queries.js");

async function listFolders(req, res) {
  try {
    const userId = req.user.id;
    const folders = await db.listFolders(userId);
    res.render("folders", { folders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch folders");
  }
}

async function createFolder(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    await db.createFolder(name, userId);
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not create folder");
  }
}

async function renameFolder(req, res) {
  try {
    // Fetching folder to check ownership
    const id = Number(req.params.id);
    const folder = await db.findFolder(id);

    if (!folder || folder.userId !== req.user.id) {
      return res.status(403).send("Not authorized to rename this folder");
    }

    // Updating folder name
    const name = req.body.name;
    await db.renameFolder(id, name);
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not rename folder");
  }
}

async function deleteFolder(req, res) {
  try {
    // First, making sure the folder belongs to the logged-in user
    const id = Number(req.params.id);
    const folder = await db.findFolder(id);

    if (!folder || folder.userId !== req.user.id) {
      return res.status(403).send("Not authorized to delete this folder");
    }

    // Then, deleting
    await db.deleteFolder(id);
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not delete folder");
  }
}

module.exports = { listFolders, createFolder, renameFolder, deleteFolder };
