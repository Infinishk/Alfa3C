const db = require('../util/database');

module.exports = class Contrato{
    constructor(mi_IDContrato,mi_IDCliente,mi_IDRazonSocial,mi_Inflacion,mi_fechaInicio,mi_fechaFin,mi_costoTotal,mi_Estatus){
        this.IDContrato = mi_IDContrato;
        this.IDCliente = mi_IDCliente;
        this.IDRazonSocial = mi_IDRazonSocial;
        this.Inflacion = mi_Inflacion;
        this.fechaInicio = mi_fechaInicio;
        this.fechaFin = mi_fechaFin;
        this.costoTotal = mi_costoTotal;
        this.Estatus = mi_Estatus;
    }

    static save(cliente,razonSocial,inflacion,fechaInicio,fechaFin,costoTotal) {
        return db.execute(
            `INSERT INTO contrato (IDCliente,IDRazonSocial, Inflacion, FechaInicio, FechaFin, CostoTotal) VALUES (?, ?, ?, ?, ?)`,
            [cliente,razonSocial, inflacion, fechaInicio, fechaFin, costoTotal]);
    }
}