const db = require('../util/database');

module.exports = class RazonSocial{
    constructor(mi_IDRazonSocial,mi_NombreEmpresa,mi_ReferenciaBancaria){
        this.IDRazonSocial = mi_IDRazonSocial;
        this.NombreEmpresa = mi_NombreEmpresa;
        this.ReferenciaBancaria = mi_ReferenciaBancaria
    }

    static update(nombreEmpresa,referenciaBancaria,idRazonSocial) {
        return db.execute(
            `UPDATE razonSocial SET NombreEmpresa=?, ReferenciaBancaria=? WHERE IDRazonSocial=?`,
            [nombreEmpresa,referenciaBancaria,idRazonSocial] 
        );
    }

    static fetchOne(idRazonSocial){
        return db.execute('Select * from razonSocial WHERE IDRazonSocial = ?',[idRazonSocial]);
    }
}