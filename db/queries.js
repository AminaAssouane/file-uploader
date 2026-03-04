const prisma = require("./prisma");

async function createUser({ name, email, password }) {
  return prisma.user.create({
    data: { name, email, password },
  });
}

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

module.exports = {
  createUser,
  listFolders,
  createFolder,
  findFolder,
  renameFolder,
  deleteFolder,
};
