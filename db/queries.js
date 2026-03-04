const prisma = require("./prisma");

// AUTH
async function createUser({ name, email, password }) {
  return prisma.user.create({
    data: { name, email, password },
  });
}

// FOLDERS
async function listFolders(userId) {
  return await prisma.folder.findMany({
    where: { userId },
  });
}

async function createFolder(name, userId) {
  await prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
}

async function findFolder(id) {
  return await prisma.folder.findUnique({
    where: { id },
  });
}

async function renameFolder(id, name) {
  await prisma.folder.update({
    where: { id },
    data: { name },
  });
}

async function deleteFolder(id) {
  await prisma.folder.delete({
    where: { id },
  });
}

// FILES
async function listFilesByUser(userId) {
  return await prisma.file.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

async function listFilesByFolder(folderId, userId) {
  return await prisma.file.findMany({
    where: { folderId, userId },
    orderBy: { createdAt: "desc" },
  });
}

async function getFileById(id, userId) {
  return await prisma.file.findFirst({
    where: {
      id,
      userId,
    },
  });
}

async function createFile({ name, path, size, userId, folderId }) {
  return await prisma.file.create({
    data: {
      name,
      path,
      size,
      userId,
      folderId: folderId || null,
    },
  });
}

module.exports = {
  createUser,
  listFolders,
  createFolder,
  findFolder,
  renameFolder,
  deleteFolder,
  listFilesByUser,
  listFilesByFolder,
  getFileById,
  createFile,
};
