const prisma = require("../db/queries.js");

async function listFolders(req, res) {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });
    res.render("folders", { folders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not fetch folders");
  }
}

async function createFolder(req, res) {
  try {
    const { name } = req.body;
    await prisma.folder.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not create folder");
  }
}

async function renameFolder(req, res) {
  try {
    // Fetching folder to check ownership
    const folder = await prisma.folder.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!folder || folder.userId !== req.user.id) {
      return res.status(403).send("Not authorized to rename this folder");
    }

    // Updating folder name
    await prisma.folder.update({
      where: { id: Number(req.params.id) },
      data: { name: req.body.name },
    });
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not rename folder");
  }
}

async function deleteFolder(req, res) {
  try {
    // First, making sure the folder belongs to the logged-in user
    const folder = await prisma.folder.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!folder || folder.userId !== req.user.id) {
      return res.status(403).send("Not authorized to delete this folder");
    }

    // Them, deleting
    await prisma.folder.delete({
      where: { id: Number(req.params.id) },
    });
    res.redirect("/folders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not delete folder");
  }
}

module.exports = { listFolders, createFolder, renameFolder, deleteFolder };
