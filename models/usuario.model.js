const db = require('../util/database');

module.exports = class Usuario {

    static modifyUserStatus(status, userID) {
        return db.execute('UPDATE usuario SET Status = ? WHERE IDUsuario = ?',
            [status, userID]);
    }

};