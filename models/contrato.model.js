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

    static fetchOne(id){
        return db.execute('SELECT Contrato.IDContrato, RazonSocial.NombreEmpresa, Inflacion.PorcentajeInflacion, Contrato.DuracionMeses, Contrato.Titulo, Contrato.Estatus FROM Contrato JOIN RazonSocial ON Contrato.IDRazonSocial = RazonSocial.IDRazonSocial JOIN Inflacion ON Contrato.IDInflacion = Inflacion.IDInflacion WHERE Contrato.IDContrato = ?', [id]);
    }

    static fetchName(nombre) {
        return db.execute('SELECT Contrato.IDContrato FROM Contrato WHERE Contrato.Titulo = ?', [nombre]);
    }

    static fetchClientes(id){
        return db.execute('SELECT DISTINCT Cliente.IDCliente, Cliente.Nombre, Cliente.Apellidos, Cliente.TipoCliente, Cliente.MontoRetencion, Cliente.PorcentajeInteres FROM Cliente JOIN Renta on Cliente.IDCliente = Renta.IDCliente JOIN Contrato ON Renta.IDContrato = Contrato.IDContrato WHERE Contrato.IDContrato = ?', [id]);
    }

    static updateEstatus(estatus, id){
        return db.execute('UPDATE Contrato SET Estatus = ? WHERE IDContrato = ?', [estatus, id]);
    }

    static save(idRazonSocial, titulo,numMeses) {
        return db.execute(
            `INSERT INTO Contrato (IDRazonSocial, Titulo, DuracionMeses, Estatus) VALUES (?, ?, ?, 1)`,
            [idRazonSocial,titulo,numMeses]
        );
    }

    static update(idRazonSocial, titulo,numMeses,idContrato) {
        return db.execute(
            `UPDATE Contrato SET IDRazonSocial=?, Titulo=?, DuracionMeses=? WHERE IDContrato=?`,
            [idRazonSocial, titulo, numMeses, idContrato] 
        );
    }
}
