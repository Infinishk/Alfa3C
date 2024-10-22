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

    static fetchPrimerRentaNoPagada(IDCliente) {
        return db.execute(`SELECT R.IDRenta, R.MontoPagado, R.MontoAPagar, R.FechaLimite, R.Recargos, 
            C.Nombre, C.Apellidos, C.ReferenciaBancaria, C.IDCliente, C.RFC, C.TipoCliente 
            FROM Renta AS R, Cliente AS C WHERE C.IDCliente = R.IDCliente AND R.IDCliente = ? 
            AND Pagado = 0 LIMIT 1`, [IDCliente]);
    }

};