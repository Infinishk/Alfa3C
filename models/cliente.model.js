const db = require('../util/database');

module.exports = class Cliente {

    static fetchClienteRFC(RFC) {
        return db.execute('SELECT * FROM cliente WHERE RFC = ?', [RFC]);
    }

};