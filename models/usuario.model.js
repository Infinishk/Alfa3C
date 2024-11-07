const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario{
    // Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(miIDUsuario, miPassword) {
        this.IDUsuario = miIDUsuario;
        this.password = miPassword;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    updateContra() {
        return bcrypt.hash(this.password, 12)
            .then((passwordCifrado) => {
                return db.execute(
                    'UPDATE Usuario SET `Contraseña`=?, `Status`=1 WHERE IDUsuario=?',
                    [passwordCifrado, this.IDUsuario]
                );
            })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                throw Error('Error al actualizar la contraseña.');
            });
    }

    static saveUsuario(Nombre, Apellidos, CorreoElectronico) {
        return db.execute(
            'INSERT INTO Usuario (Nombre, Apellidos, Contraseña, CorreoElectronico, Status, FechaRegistro) VALUES (?, ?, "", ?, 0, NOW())',
            [Nombre, Apellidos, CorreoElectronico]
        );
    }
    
    static fetchOne(CorreoElectronico) {
        return db.execute('SELECT * FROM Usuario WHERE CorreoElectronico = ?',
            [CorreoElectronico]);
    }

    static fetchOneID(IDUsuario) {
        return db.execute('SELECT * FROM Usuario WHERE IDUsuario = ?',
            [IDUsuario]);
    }

    static fetchCorreo(IDUsuario) {
        return db.execute('SELECT correoElectronico FROM Usuario WHERE IDUsuario = ?',
            [IDUsuario]);
    }

    static getPermisos(IDUsuario) {
        return db.execute(
            `SELECT Ca.IDCasoUso
            FROM Usuario U, Posee P, Rol R, Contiene C, CasoUso Ca
            WHERE U.IDUsuario = ? AND U.IDUsuario = P.IDUsuario
            AND P.IDRol = R.IDRol AND R.IDRol = C.IDRol 
            AND C.IDCasoUso = Ca.IDCasoUso`,
            [IDUsuario]);
    }

    static getRol(IDUsuario) {
        return db.execute(`SELECT P.IDRol
        FROM Usuario U
        JOIN Posee P ON U.IDUsuario = P.IDUsuario
        JOIN Rol R ON P.IDRol = R.IDRol
        JOIN Contiene C ON R.IDRol = C.IDRol
        JOIN CasoUso Ca ON C.IDCasoUso = Ca.IDCasoUso
        WHERE U.IDUsuario = ?`, [IDUsuario]);
    }

    static fetchActivos() {
        return db.execute('SELECT * FROM Usuario WHERE UsuarioActivo = 1');
    }

    static fetchNoActivos() {
        return db.execute('SELECT * FROM Usuario WHERE UsuarioActivo = 0');
    }

    static update(IDUsuario,estado){
        return db.execute('UPDATE Usuario SET UsuarioActivo = ? WHERE IDUsuario = ?',
        [estado,IDUsuario]);
    }

    static buscarActivos(consulta) {
        return db.execute(
            'SELECT usuario.* FROM Usuario WHERE IDUsuario LIKE ? AND UsuarioActivo = 1',
            [`%${consulta}%`]
        );
    }

    static buscarNoActivos(consulta) {
        return db.execute(
            'SELECT usuario.* FROM Usuario WHERE IDUsuario LIKE ? AND UsuarioActivo = 0',
            [`%${consulta}%`]
        );
    }

    static saveRol(IDUsuario, IDRol) {
        return db.execute('INSERT INTO Posee (IDUsuario, IDRol) VALUES (?, ?)', [IDUsuario, IDRol]);
    }

    static saveCliente(IDCliente, Direccion, Telefono, RFC, ReferenciaBancaria, PorcentajeInteres, MontoRetencion, TipoCliente) {
        return db.execute(
            'INSERT INTO Cliente (IDCliente, Direccion, Teléfono, RFC, ReferenciaBancaria, PorcentajeInteres, MontoRetencion, TipoCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [IDCliente, Direccion, Telefono, RFC, ReferenciaBancaria, PorcentajeInteres, MontoRetencion, TipoCliente]
        );
    }
    

};