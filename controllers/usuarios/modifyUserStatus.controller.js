const Usuario = require('../../models/usuario.model');

exports.postModifyUserStatus = (request, response, next) => {
    const userID = request.body.userID;
    const status = request.body.status;

    Usuario.modifyUserStatus(userID, status)
    .then(([answer, fieldData]) => {
        response.status(200).json('El usuario ha sido modificado con exito');
    })
    .catch((error) => {
        response.status(500).json('Hubo un error al modificar el usuario');
        console.log(error);
    });

};