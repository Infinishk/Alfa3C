
const Usuario = require('../../models/usuario.model');


exports.get_modificar_contrasena = (request, response, next) => {
    response.render('configuracion/modificarContrasena', {
        error: null,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
};

exports.post_modificar_contrasena = async (request, response, next) => {
    try {

        const IDUsuario = request.session.idUsuario;
        const contrasena = request.body.contrasena;

        await Usuario.modifyPassword(contrasena,IDUsuario);

        // Renderizar la vista con la información del contrato y la razón social
        response.render('configuracion/configuracion', {
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