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
        db.execute('UPDATE renta SET Recargos = ?, TieneRecargos = 1 WHERE IDRenta = ?', 
            [montoRecargo, IDRenta]);
    }

    static fetchPrimerRentaNoPagada(IDCliente) {
        return db.execute(`SELECT * FROM 

            (SELECT R.IDRenta, R.MontoPagado, R.MontoAPagar, R.FechaLimite, R.Recargos,
            C.ReferenciaBancaria, C.IDCliente, C.TipoCliente, R.IDDetalleContrato, AC.Nombre,
            ROW_NUMBER() OVER (PARTITION BY R.IDDetalleContrato ORDER BY R.FechaLimite ASC) AS RentaContratos
            FROM renta AS R, cliente AS C, usuario AS U, asignacionContrato AS AC
            WHERE C.IDCliente = R.IDCliente AND C.IDCliente = U.IDUsuario AND R.IDDetalleContrato = AC.IDDetalleContrato
            AND R.Pagado = 0 AND R.IDCliente = ?) AS RentasSinPagar
            
            WHERE RentaContratos = 1;`, [IDCliente]);
    }

};