const mysql = require('mysql2');
const { PrismaClient } = require('@prisma/client');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'Alfa3C',
    password: 'Queretaro2017#'
});

// Configuración de Prisma
const prisma = new PrismaClient();

module.exports = {
    db: pool.promise(),
    prisma
};