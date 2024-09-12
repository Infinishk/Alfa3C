const db = require('../util/database');

module.exports = class Usuario {

    static fetchActiveUsers() {
        return db.execute('SELECT * FROM usuario WHERE Status = 1 AND IDUsuario NOT LIKE "ADMIN%"');
    }

    static fetchInactiveUsers() {
        return db.execute('SELECT * FROM usuario WHERE Status = 0 AND IDUsuario NOT LIKE "ADMIN%"');
    }

    static fetchAdmins() {
        return db.execute('SELECT * FROM usuario WHERE IDUsuario LIKE "ADMIN%"');
    }

};