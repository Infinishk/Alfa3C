const db = require('../util/database');

module.exports = class Renta {

    static fetchRentasPeriodo(fechaActual) {
        return db.execute(`SELECT IDRenta, montoAPagar, FechaLimite, R.IDCliente FROM renta AS R, 
            contrato AS C  WHERE C.IDContrato = R.IDContrato AND C.Estatus = 1
            AND R.Pagado = 0 AND R.Recargos = 0 AND R.FechaLimite < ?`, [fechaActual]);
    }

    static getRecargosCliente(IDCliente){
        return db.execute('SELECT PorcentajeInteres FROM cliente WHERE IDCliente = ?', [IDCliente]);
    }

    static setRecargosDeuda(IDRenta, montoRecargo) {
        db.execute('UPDATE Renta SET Recargos = ?, \n TieneRecargos = 1 \n WHERE IDRenta = ?', 
            [montoRecargo, IDRenta]);
    }

};