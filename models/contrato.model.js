const db = require('../util/database');

module.exports = class Contrato{
    constructor(mi_IDContrato,mi_IDRazonSocial,mi_Titulo,mi_numMeses,mi_Estatus){
        this.IDContrato = mi_IDContrato;
        this.Titulo = mi_Titulo;
        this.IDRazonSocial = mi_IDRazonSocial;
        this.numMeses = mi_numMeses;
        this.Estatus = mi_Estatus;
    }

    static save(idRazonSocial, titulo,numMeses) {
        return db.execute(
            `INSERT INTO Contrato (IDRazonSocial, Titulo, DuracionMeses, Estatus) VALUES (?,?, ?, 1)`,
            [idRazonSocial, titulo,numMeses]
        );
    }

    static fetchOne(titulo){
        return db.execute('Select * from Contrato WHERE Titulo = ?',[titulo]);
    }
}