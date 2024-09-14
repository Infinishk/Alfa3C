const db = require('../util/database');

module.exports = class Renta {

    static fetchRentasPeriodo(fechaActual) {
        return db.execute(`SELECT IDRenta, montoAPagar, FechaLimite, R.IDCliente FROM renta AS R
            WHERE R.Pagado = 0 AND R.Recargos = 0 AND R.FechaLimite < ?`, [fechaActual]);
    }

    static getRecargosCliente(IDCliente){
        return db.execute('SELECT PorcentajeInteres FROM cliente WHERE IDCliente = ?', [IDCliente]);
    }

    static setRecargosDeuda(IDRenta, montoRecargo) {
        db.execute('UPDATE Renta SET Recargos = ?, TieneRecargos = 1 WHERE IDRenta = ?', 
            [montoRecargo, IDRenta]);
    }

};