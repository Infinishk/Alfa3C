const Inquilino = require('../../models/inquilino.model');

exports.get_buscar = async (request, response, next) => {
    response.render('inquilino/buscarInquilino', {
        username: request.session.username || '',
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        csrfToken: request.csrfToken()
    });
};

exports.get_autocomplete = (request, response, next) => {
    const { valor_busqueda } = request.params;

    if (valor_busqueda) {
        // Asumiendo la estructura de RFCs mexicanos
        const matches_rfc = valor_busqueda.match(/[A-Z]{4}\d{6}[A-Z0-9]{2,3}/i);
        const matches_nombre = valor_busqueda.replace(/[A-Z]{4}\d{6}[A-Z0-9]{2,3}/i, '').trim();

        const rfc = matches_rfc ? matches_rfc[0] : null;
        const nombre = matches_nombre || null;

        if (rfc && nombre) {
            Inquilino.fetch_both(rfc, nombre)
                .then(([inquilinos]) => {
                    return response.status(200).json({ inquilinos });
                })
                .catch((error) => console.error(error));
        } else if (rfc) {
            Inquilino.fetch(rfc)
                .then(([inquilinos]) => {
                    return response.status(200).json({ inquilinos });
                })
                .catch((error) => console.error(error));
        } else if (nombre) {
            Inquilino.fetch(nombre)
                .then(([inquilinos]) => {
                    return response.status(200).json({ inquilinos });
                })
                .catch((error) => console.error(error));
        } else {
            return response.status(404).json({ message: 'No se encontró RFC or nombre válido' });
        }
    } else {
        return response.status(400).json({ message: 'No hay valor_busqueda' });
    }
};
