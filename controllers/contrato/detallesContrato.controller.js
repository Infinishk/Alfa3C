const Contrato = require('../../models/contrato.model');

exports.post_detalles_contrato = async (request, response, next) => {
    try {
        // Obtener datos de contratos
        const id = request.body.id;
        const contratoData = await Contrato.fetchOne(id);
        const [clientes] = await Contrato.fetchClientes(id);

        const contrato = contratoData[0];

        // Presentar interfaz a usuario
        response.render('contrato/detallesContrato', {
            contrato: contrato,
            clientes: clientes,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
        });
    } catch (error) {
        console.log(error);
        response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
        });
    }
}