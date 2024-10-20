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

    static fetchOne(referenciaBancaria){
        return db.execute('Select * from RazonSocial WHERE ReferenciaBancaria = ?',[referenciaBancaria]);
    }

    static fetchOne(referenciaBancaria){
        return db.execute('Select * from RazonSocial WHERE ReferenciaBancaria = ?',[referenciaBancaria]);
    }
}