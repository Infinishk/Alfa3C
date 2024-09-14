const db = require('../util/database');

module.exports = class Contrato{
    constructor(mi_IDContrato,mi_IDRazonSocial,mi_Titulo,mi_numMeses,mi_Estatus){
        this.IDContrato = mi_IDContrato;
        this.Titulo = mi_Titulo;
        this.IDRazonSocial = mi_IDRazonSocial;
        this.numMeses = mi_numMeses;
        this.Estatus = mi_Estatus;
    }

    static update(idRazonSocial, titulo,numMeses,idContrato) {
        return db.execute(
            `UPDATE Contrato SET IDRazonSocial=?, Titulo=?, DuracionMeses=? WHERE IDContrato=?`,
            [idRazonSocial, titulo, numMeses, idContrato] 
        );
    }

    static fetchOne(titulo){
        return db.execute('Select * from Contrato WHERE Titulo = ?',[titulo]);
    }
}
