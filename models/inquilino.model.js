const db = require('../util/database');

module.exports = class Inquilino{
    constructor(mi_IDInquilino,mi_Direccion,mi_Telefono,mi_RFC,mi_RefBancaria, mi_PorcInteres, mi_Tipo, mi_Retencion){
        this.IDContrato = mi_IDContrato;
        this.Titulo = mi_Titulo;
        this.IDRazonSocial = mi_IDRazonSocial;
        this.numMeses = mi_numMeses;
        this.Estatus = mi_Estatus;
    }

    static fetch(busqueda) {
        return db.execute(`SELECT Cliente.RFC, Usuario.Nombre, Usuario.Apellidos FROM Cliente JOIN Usuario ON Cliente.IDCliente = Usuario.IDUsuario
            WHERE CONCAT_WS(' ', Usuario.Nombre, Usuario.Apellidos) LIKE ? OR Cliente.RFC LIKE ? `, ['%' + busqueda + '%', '%' + busqueda + '%']);
    }

    static fetch_both(rfc, nombre) {
        return db.execute(`SELECT Cliente.RFC, Usuario.Nombre, Usuario.Apellidos FROM Cliente JOIN Usuario ON Cliente.IDCliente = Usuario.IDUsuario
         WHERE CONCAT_WS(' ', Usuario.Nombre, Usuario.Apellidos) LIKE ? AND Cliente.RFC LIKE ? `, ['%' + nombre + '%', '%' + rfc + '%']);
    }

    static fetch_datos(rfc) {
        return db.execute(`SELECT Cliente.IDCliente, Cliente.RFC, Cliente.Direccion, Cliente.Teléfono, Cliente.ReferenciaBancaria, Cliente.PorcentajeInteres,
            Cliente.TipoCliente, Cliente.MontoRetencion, Usuario.Nombre, Usuario.Apellidos FROM Cliente JOIN Usuario ON Cliente.IDCliente = Usuario.IDUsuario
            WHERE Cliente.RFC = ?`, [rfc]);
    }

    static fetch_renta(id) {
        return db.execute(`SELECT IDRenta, IDDetalleContrato, MontoPagado, MontoAPagar, MontoInflacion, Recargos, FechaLimite, Pagado, Ajuste FROM Renta WHERE IDCliente = ?`, [id]);
    }

    static fetch_pagos(id) {
        return db.execute(`SELECT Motivo, MontoPagado, Nota, MetodoPago, FechaPago FROM Pago WHERE IDRenta = ?`, [id]);
    }

    static fetch_asignaciones(id) {
        return db.execute(`SELECT IDDetalleContrato, Nombre, FechaInflacion, PorcentajeInflacion FROM AsignacionContrato WHERE IDCliente = ?`, [id]);
    }
}
