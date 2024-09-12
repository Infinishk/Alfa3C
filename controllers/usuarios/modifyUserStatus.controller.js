const Usuario = require('../../models/usuario.model');

exports.postModifyUserStatus = (request, response, next) => {
    const status = request.body.status;
    const userID = request.body.userID;

    Usuario.modifyUserStatus(status, userID)
    .then(([answer, fieldData]) => {
        response.status(200).json({
            mensaje: 'El usuario ha sido modificado con exito'
        });
    })
    .catch((error) => {
        response.status(500).json({
            mensaje: 'Hubo un error al modificar el usuario', 
            error: error
        });
    });

};