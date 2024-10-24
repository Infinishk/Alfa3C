const db = require('../util/database');

module.exports = class Cliente {

    static fetchClienteRFC(RFC) {
        return db.execute(`SELECT * FROM cliente AS C, usuario AS U 
            WHERE C.IDCliente = U.IDUsuario AND RFC = ?`, [RFC]);
    }

};