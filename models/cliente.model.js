const prisma = require('../util/database');

const { fetchClienteRFCDB } = require('@prisma/client/sql');

module.exports = class Cliente {

    static fetchClienteRFC(RFC) {
        return prisma.$queryRawTyped(fetchClienteRFCDB(RFC));
    }

};