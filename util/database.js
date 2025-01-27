const { PrismaClient } = require('@prisma/client');

// Configuración de Prisma
const prisma = new PrismaClient();

module.exports = prisma;