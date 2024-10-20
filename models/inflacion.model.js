const db = require('../util/database');

module.exports = class Inflacion{
    constructor(mi_IDInflacion,mi_PorcentajeInflacion,mi_FechaInflacion){
        this.IDInflacion = mi_IDInflacion;
        this.PorcentajeInflacion = mi_PorcentajeInflacion;
        this.FechaInflacion = mi_FechaInflacion
    }

    static save(porcentaje) {
        return db.execute(
            `INSERT INTO Inflacion (PorcentajeInflacion) VALUES (?)`,
            [porcentaje]); 
    }

    static fetchOne(porcentaje){
        return db.execute('Select IDInflacion from Inflacion WHERE PorcentajeInflacion = ?',[porcentaje]);
    }
}