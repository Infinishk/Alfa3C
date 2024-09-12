const Usuario = require('../../models/usuario.model');

exports.postModifyUserStatus = (request, response, next) => {
    const status = request.body.status;
    const userID = request.body.userID;

    let newStatus;
    
    // Si el status actual es 1, cambiarlo a 0
    if (status == 1) {
        newStatus = 0;
    // Si el status actual es 0, cambiarlo a 1
    } else if (status == 0) {
        newStatus = 1;
    }

    Usuario.modifyUserStatus(newStatus, userID)
    .then(([answer, fieldData]) => {
        response.status(200).json({
            mensaje: 'El usuario ha sido modificado con exito',
            status: 200
        });
    })
    .catch((error) => {
        response.status(500).json({
            mensaje: 'Hubo un error al modificar el usuario', 
            error: error,
            status: 500
        });
    });

};