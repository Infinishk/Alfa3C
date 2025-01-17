const prisma = require('../util/database'); 

module.exports = class RazonSocial{

    static async update(nombreEmpresa, referenciaBancaria, idRazonSocial) {
        return prisma.razonSocial.update({
            where: { IDRazonSocial: idRazonSocial },
            data: {
                NombreEmpresa: nombreEmpresa,
                ReferenciaBancaria: referenciaBancaria,
            },
        });
    }

    static async save(nombreEmpresa, referenciaBancaria) {
        return prisma.razonSocial.create({
            data: {
                NombreEmpresa: nombreEmpresa,
                ReferenciaBancaria: referenciaBancaria,
            },
        });
    }

    static async fetchOne(referenciaBancaria) {
        return prisma.razonSocial.findFirst({
            where: { ReferenciaBancaria: referenciaBancaria },
        });
    }

    static async fetchOneName(nombreEmpresa) {
        return prisma.razonSocial.findFirst({
            where: { NombreEmpresa: nombreEmpresa },
        });
    }

    static async fetchID(referenciaBancaria) {
        return prisma.razonSocial.findFirst({
            where: { ReferenciaBancaria: referenciaBancaria },
            select: { IDRazonSocial: true },
        });
    }
}