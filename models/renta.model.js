const prisma = require('../util/database');

const { fetchPrimerRentaNoPagadaDB } = require('@prisma/client/sql');

module.exports = class Renta {

    static fetchRentasPeriodo(fechaActual) {
        return prisma.renta.findMany({
            where: {
                Pagado: 0,
                TieneRecargos: 0,
                FechaLimite: {
                    lt: fechaActual
                }
            }, 
            select: {
                IDRenta: true,
                MontoAPagar: true,
                FechaLimite: true,
                IDCliente: true
            }
        });
    }

    static getRecargosCliente(IDCliente){
        return prisma.cliente.findMany({
            where: {
                IDCliente: IDCliente
            },
            select: {
                PorcentajeInteres: true
            }
        });
    }

    static async setRecargosRenta(IDRenta, montoRecargo) {
        await prisma.renta.update({
            where: {
                IDRenta: IDRenta
            }, 
            data: {
                Recargos: montoRecargo,
                TieneRecargos: 1
            }
        });
    }

    static fetchPrimerRentaNoPagada(IDCliente) {
        return prisma.$queryRawTyped(fetchPrimerRentaNoPagadaDB(IDCliente));
    }

    static fetchNoPagadasContrato(IDDetalleContrato) {
        return prisma.renta.findMany({
            where: {
                Pagado: 0,
                IDDetalleContrato: IDDetalleContrato
            }, 
            select: {
                IDRenta: true,
                MontoPagado: true,
                MontoAPagar: true,
                FechaLimite: true,
                Recargos: true,
                MontoInflacion: true,
                IDCliente: true
            }
        });
    }

    static updateRenta(montoAUsar, IDRenta) {
        return prisma.renta.update({
            where: {
                IDRenta: IDRenta
            },
            data: {
                MontoPagado: {
                    increment: montoAUsar
                }
            }
        });
    }

};