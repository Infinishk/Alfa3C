const Inquilino = require('../../models/inquilino.model');

exports.fetch_inquilino = async (request, response, next) => {
    try {
        let matches = request.body.buscar.match(/[A-Z]{4}\d{6}[A-Z0-9]{2,3}/i);
        const rfc = matches[0];

        let inquilino = await Inquilino.fetch_datos(rfc);
        
        response.render('inquilino/consultarInquilino', {
            inquilino: inquilino[0][0],
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
            csrfToken: request.csrfToken()
        })
    }
    catch (error) {
        console.log(error);
    }
}