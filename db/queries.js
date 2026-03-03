const prisma = require("./prisma");

async function createUser({ name, email }) {
  return prisma.user.create({
    data: { name, email, password },
  });
}

module.exports = { createUser };
