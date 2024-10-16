const db = require('../util/database');

module.exports = class Contrato{
    constructor(mi_IDContrato,mi_IDRazonSocial,mi_Titulo,mi_numMeses,mi_Estatus){
        this.IDContrato = mi_IDContrato;
        this.Titulo = mi_Titulo;
        this.IDRazonSocial = mi_IDRazonSocial;
        this.numMeses = mi_numMeses;
        this.Estatus = mi_Estatus;
    }

    static fetchActivos(){
        return db.execute('SELECT Contrato.IDContrato, RazonSocial.NombreEmpresa, Inflacion.PorcentajeInflacion, Contrato.DuracionMeses, Contrato.Titulo FROM Contrato JOIN RazonSocial ON Contrato.IDRazonSocial = RazonSocial.IDRazonSocial JOIN Inflacion ON Contrato.IDInflacion = Inflacion.IDInflacion WHERE Contrato.Estatus = 1');
    }

    static fetchInactivos(){
        return db.execute('SELECT Contrato.IDContrato, RazonSocial.NombreEmpresa, Inflacion.PorcentajeInflacion, Contrato.DuracionMeses, Contrato.Titulo FROM Contrato JOIN RazonSocial ON Contrato.IDRazonSocial = RazonSocial.IDRazonSocial JOIN Inflacion ON Contrato.IDInflacion = Inflacion.IDInflacion WHERE Contrato.Estatus = 0');
    }
}