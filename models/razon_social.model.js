const db = require('../util/database');

module.exports = class RazonSocial{
    constructor(mi_IDRazonSocial,mi_NombreEmpresa,mi_ReferenciaBancaria){
        this.IDRazonSocial = mi_IDRazonSocial;
        this.NombreEmpresa = mi_NombreEmpresa;
        this.ReferenciaBancaria = mi_ReferenciaBancaria
    }

    static save(nombreEmpresa,referenciaBancaria) {
        return db.execute(
            `INSERT INTO razonSocial (NombreEmpresa, ReferenciaBancaria) VALUES (?, ?)`,
            [nombreEmpresa, referenciaBancaria]); 
    }

    static fetchID(referenciaBancaria){
        return db.execute(
            `SELECT IDRazonSocial FROM razonSocial WHERE ReferenciaBancaria = ?`,
            [referenciaBancaria]
        );
    }
}