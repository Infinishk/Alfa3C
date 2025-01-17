
const prisma = require('../util/database'); 

const { fetchActiveContratsDB, fetchInactiveContratsDB } = require('@prisma/client/sql');

module.exports = class Contrato{

    static async fetchActivos() {
        return prisma.$queryRawTyped(fetchActiveContratsDB());
    }

    static async fetchInactivos() {
        return prisma.$queryRawTyped(fetchInactiveContratsDB());
    }

    static async fetchOne(id) {
        return prisma.contrato.findUnique({
            where: { IDContrato: id },
            select: {
                IDContrato: true,
                Titulo: true,
                Estatus: true,
                DuracionMeses: true,
                razonSocial: {
                    select: { NombreEmpresa: true },
                },
            },
        });
    }

    static async fetchName(nombre) {
        return prisma.contrato.findFirst({
            where: { Titulo: nombre },
            select: { IDContrato: true },
        });
    }

    static async fetchClientes(id) {
        return prisma.asignacionContrato.findMany({
            where: { IDContrato: id },
            select: {
                Nombre: true,
                cliente: {
                    select: {
                        RFC: true,
                        TipoCliente: true,
                        MontoRetencion: true,
                        PorcentajeInteres: true,
                    },
                },
                clienteUsuario: {
                    select: {
                        Nombre: true,
                        Apellidos: true,
                    },
                },
            },
        });
    }

    static async fetchNumClientes(id) {
        return prisma.asignacionContrato.count({
            where: { IDContrato: id },
        });
    }

    static async updateEstatus(estatus, id) {
        return prisma.contrato.update({
            where: { IDContrato: id },
            data: { Estatus: estatus },
        });
    }

    static async save(idRazonSocial, titulo, numMeses) {
        return prisma.contrato.create({
            data: {
                IDRazonSocial: idRazonSocial,
                Titulo: titulo,
                DuracionMeses: numMeses,
                Estatus: 1,
            },
        });
    }

    static async update(idRazonSocial, titulo, numMeses, idContrato) {
        return prisma.contrato.update({
            where: { IDContrato: idContrato },
            data: {
                IDRazonSocial: idRazonSocial,
                Titulo: titulo,
                DuracionMeses: numMeses,
            },
        });
    }
}
