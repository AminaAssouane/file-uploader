const prisma = require("./prisma");

async function createUser({ name, email, password }) {
  return prisma.user.create({
    data: { name, email, password },
  });
}

module.exports = { createUser };
