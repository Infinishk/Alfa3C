const Contrato = require('../../models/contrato.model');

exports.fetch_contratos = async (request, response, next) => {
    try {
        // Obtener datos de contratos
        const activos = await Contrato.fetchActivos();
        const inactivos = await Contrato.fetchInactivos();

        // Obtener número de asignaciones + agregar a cada contrato
        for (let activo of activos) {
            num = await Contrato.fetchNumClientes(activo.IDContrato);
            activo.NumClientes = num[0]?.asignaciones || 0;
        }

        for (let inactivo of inactivos) {
            num = await Contrato.fetchNumClientes(inactivo.IDContrato);
            inactivo.NumClientes = num[0]?.asignaciones || 0;
        }

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