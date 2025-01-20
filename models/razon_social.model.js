const prisma = require('../util/database'); 

module.exports = class RazonSocial{

    static async update(nombreEmpresa, referenciaBancaria, idRazonSocial) {
        return await prisma.$executeRaw`
            UPDATE RazonSocial
            SET NombreEmpresa = ${nombreEmpresa}, ReferenciaBancaria = ${referenciaBancaria}
            WHERE IDRazonSocial = ${idRazonSocial}`;
    }

    static async save(nombreEmpresa, referenciaBancaria) {
        return await prisma.$executeRaw`
            INSERT INTO RazonSocial (NombreEmpresa, ReferenciaBancaria)
            VALUES (${nombreEmpresa}, ${referenciaBancaria})`;
    }

    static async fetchOne(referenciaBancaria) {
        return prisma.$queryRaw`
            SELECT * FROM RazonSocial
            WHERE ReferenciaBancaria = ${referenciaBancaria}`;
    }

    static async fetchOneName(nombreEmpresa) {
        return await prisma.$queryRaw`
            SELECT * FROM RazonSocial
            WHERE NombreEmpresa = ${nombreEmpresa}`;
    }

    static async fetchID(referenciaBancaria) {
        return await prisma.$queryRaw`
            SELECT IDRazonSocial FROM RazonSocial
            WHERE ReferenciaBancaria = ${referenciaBancaria}`;
    }

}