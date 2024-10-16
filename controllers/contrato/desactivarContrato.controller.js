const Contrato = require('../../models/contrato.model');

exports.post_modificar_estatus = async (request, response, next) => {
    Contrato.updateEstatus(request.body.estatus, request.body.id)
    .then(([rows, fieldData]) => {
        response.status(200).json({
            success: true
        });
    })
    .catch((error) => {
        console.log(error)
    })
}