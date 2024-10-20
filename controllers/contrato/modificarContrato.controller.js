const Contrato = require('../../models/contrato.model');
const RazonSocial = require('../../models/razon_social.model');

exports.post_fetch_contrato = async (request, response, next) => {
    try {
        const IDContrato = request.body.id;

        // Obtener el contrato basado en el título
        const [contratos] = await Contrato.fetchOne(IDContrato);

        const contrato = contratos[0];

        // Obtener la información de la razón social asociada
        const [razonSocialInfo] = await RazonSocial.fetchOneName(contrato.NombreEmpresa);

        if (!razonSocialInfo || razonSocialInfo.length === 0) {
            return response.status(500).send('No se pudo encontrar la razón social asociada');
        }

        // Renderizar la vista con la información del contrato y de la razón social
        response.render('contrato/modificarContrato', {
            editar: true,
            fetch: false,
            contrato: contrato,
            razonSocial: razonSocialInfo[0],
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
};


exports.post_modificar_contrato = async (request, response, next) => {
    try {
        const razonSocial = request.body.razonSocial;
        const nombreEmpresa = request.body.nombreEmpresa;
        const titulo = request.body.titulo;
        const numMeses = request.body.numMeses;
        const IDContrato = request.body.idContrato;
        const IDRazonSocial = request.body.idRazonSocial;

        await RazonSocial.update(nombreEmpresa, razonSocial, IDRazonSocial);

        // Actualizar el contrato con el ID de la razón social
        await Contrato.update(IDRazonSocial, titulo, numMeses, IDContrato);

        // Obtener el contrato actualizado
        const [contratos] = await Contrato.fetchOne(titulo);

        // Obtener la razón social asociada
        const [razonSocialInfo] = await RazonSocial.fetchOne(IDRazonSocial);

        // Renderizar la vista con la información del contrato y la razón social
        response.render('contrato/resultadoContrato', {
            modificar: true,
            registrar: false,
            contrato: contratos[0],
            razonSocial: razonSocialInfo[0],
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
};
