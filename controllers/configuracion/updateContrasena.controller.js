const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_update_password = (request, response, next) => {
    response.render('configuracion/update_password', { 
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        verificar:true,
        actualizar:false
    });
}

exports.post_verify_password = async (request, response, next) => {
    const password = request.body.oldPassword;
    const user = "SBP001";
    const contrasena = await Usuario.fetchOne(user);
    
    const match = await bcrypt.compare(password, contrasena[0][0].Contraseña);

    if (match) {
        response.render('configuracion/update_password', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
            verificar:false,
            actualizar:true
        });
    } else {
        response.render('configuracion/update_password', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
            verificar:true,
            actualizar:false
        });
    }
}

exports.post_modificar_contrasena = async (request, response, next) => {
    try {

        const IDUsuario = request.session.idUsuario;
        const contrasena = request.body.contrasena;

        await Usuario.updateContra(contrasena,IDUsuario);

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