const db = require('../util/database');

module.exports = class Pago{

    constructor(miIDRenta, miMotivo, miMontoPagado, miNota, miMetodoPago, mifechaPago){
        this.IDDeuda = miIDRenta;
        this.motivo = miMotivo;
        this.montoPagado = miMontoPagado;
        this.nota = miNota;
        this.metodoPago = miMetodoPago;
        this.fechaPago = mifechaPago;
    }

    savePagoManual() {
        db.execute('CALL savePago(?, ?, ?, ?, ?, ?);', 
            [this.IDDeuda, this.motivo, this.montoPagado, this.nota, this.metodoPago, this.fechaPago]);
    }

};