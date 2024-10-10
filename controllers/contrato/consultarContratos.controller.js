const Contrato = require('../../models/contrato.model');

exports.fetch_contratos = async (request, response, next) => {
    try {
        // Obtener datos de contratos
        const [activos] = await Contrato.fetchActivos();
        const [inactivos] = await Contrato.fetchInactivos();

        // Presentar interfaz a usuario
        response.render('contrato/consultarContratos', {
            activos: activos,
            inactivos: inactivos,
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