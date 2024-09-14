const Contrato = require('../../models/contrato.model');
const RazonSocial = require('../../models/razon_social.model');

exports.get_registrar_contrato = (request, response, next) => {
    response.render('contrato/registrarContrato', {
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
};

exports.post_registrar_contrato = async (request, response, next) => {
    try {
        const razonSocial = request.body.razonSocial;
        const nombreEmpresa = request.body.nombreEmpresa;
        const titulo = request.body.titulo;
        const numMeses = request.body.numMeses;

        const verificarRazonSocial = await RazonSocial.fetchID(razonSocial);

        if (verificarRazonSocial.length === 0) {
            await RazonSocial.save(nombreEmpresa, razonSocial);
            // Obtener el ID de la razón social
            const [rows] = await RazonSocial.fetchID(razonSocial);
            const IDRazon = rows[0].IDRazonSocial;
            // Guardar el contrato usando el ID de la razón social
            await Contrato.save(IDRazon, titulo, numMeses);
        }

        else{
            await Contrato.save(verificarRazonSocial[0][0].IDRazonSocial, titulo, numMeses);
        }

        // Enviar respuesta de éxito
        response.status(200).send('Contrato registrado con éxito');
    } catch (error) {
        console.log(error);
        response.status(500).send('Error al registrar el contrato');
    }
};


