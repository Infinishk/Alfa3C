const prisma = require('../util/database');

const { savePago } = require('@prisma/client/sql');

module.exports = class Pago{

    constructor(miIDRenta, miMotivo, miMontoPagado, miNota, miMetodoPago, mifechaPago){
        this.IDRenta = miIDRenta;
        this.motivo = miMotivo;
        this.montoPagado = miMontoPagado;
        this.nota = miNota;
        this.metodoPago = miMetodoPago;
        this.fechaPago = mifechaPago;
    }

    savePagoManual() {
        return prisma.$queryRawTyped(savePago(this.IDRenta, this.motivo, this.montoPagado, this.nota, this.metodoPago, this.fechaPago));
    }

};