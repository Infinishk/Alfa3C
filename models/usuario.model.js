const db = require('../util/database');

module.exports = class Usuario {

    static modifyUserStatus(status, userID) {
        return db.execute('UPDATE usuario SET Status = ? WHERE IDUsuario = ?',
            [status, userID]);
    }
    
    static fetchActiveUsers() {
        return db.execute(`SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 1 
            AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'`);
    }

    static fetchInactiveUsers() {
        return db.execute(`SELECT * FROM usuario AS U, posee AS P, cliente AS C WHERE U.Status = 0
            AND P.IDUsuario = U.IDUsuario AND U.IDUsuario = C.IDCliente AND P.IDRol = 'ROL02'`);
    }

    static fetchAdmins() {
        return db.execute(`SELECT * FROM usuario AS U, posee AS P WHERE
            P.IDUsuario = U.IDUsuario AND P.IDRol = 'ROL01'`);
    }

};