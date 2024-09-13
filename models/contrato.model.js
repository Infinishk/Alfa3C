const db = require('../util/database');

module.exports = class Contrato{
    constructor(mi_IDContrato,mi_IDCliente,mi_IDInflacion,mi_fechaInicio,mi_fechaFin,mi_costoTotal,mi_Estatus){
        this.IDContrato = mi_IDContrato;
        this.IDCliente = mi_IDCliente;
        this.IDInflacion = mi_IDInflacion;
        this.fechaInicio = mi_fechaInicio;
        this.fechaFin = mi_fechaFin;
        this.costoTotal = mi_costoTotal;
        this.Estatus = mi_Estatus;
    }

    static save(razonSocial,inflacion,fechaInicio,fechaFin,costoTotal) {
        return db.execute(
            `INSERT INTO contrato (razonSocial, inflacion, fechaInicio, fechaFin, costoTotal) VALUES (?, ?, ?, ?, ?)`,
            [razonSocial, inflacion, fechaInicio, fechaFin, costoTotal]);
    }
}