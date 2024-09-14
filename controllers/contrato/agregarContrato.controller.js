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

        if (!razonSocial || !nombreEmpresa || !titulo || !numMeses) {
            return response.status(400).send('Faltan datos requeridos');
        }

        let IDRazon;

        // Verificar si la razón social ya existe
        const [verificarRazonSocial] = await RazonSocial.fetchID(razonSocial);

        // Comprobar si la respuesta de fetchID tiene datos válidos
        if (!verificarRazonSocial || verificarRazonSocial.length === 0) {
            // Crear la nueva razón social
            await RazonSocial.save(nombreEmpresa, razonSocial);
            // Obtener el ID de la nueva razón social
            const [rows] = await RazonSocial.fetchID(razonSocial);
            if (rows.length === 0) {
                return response.status(500).send('No se pudo obtener el ID de la razón social');
            }
            IDRazon = rows[0].IDRazonSocial;
        } else {
            IDRazon = verificarRazonSocial[0].IDRazonSocial;
        }

        // Verificar que IDRazon no sea undefined
        if (IDRazon === undefined) {
            return response.status(500).send('ID de razón social no válido');
        }

        // Guardar el contrato con el ID de la razón social
        await Contrato.save(IDRazon, titulo, numMeses);

        // Enviar respuesta de éxito
        response.status(200).send('Contrato registrado con éxito');
    } catch (error) {
        console.log(error);
        response.status(500).send('Error al registrar el contrato');
    }
};