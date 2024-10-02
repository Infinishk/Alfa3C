const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_update_password = (request, response, next) => {
    response.render('configuracion/update_password', { 
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        verificar:true,
        actualizar:false,
        error:""
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
            actualizar:false,
            error: "La contraseña ingresada es incorrecta"
        });
    }
}

exports.post_modificar_contrasena = async (request, response, next) => {
    try {
        const IDUsuario = "SBP001";  // Aquí puedes obtener dinámicamente el ID si es necesario
        const newPassword = request.body.newPassword;
        // Crear una nueva instancia del modelo Usuario
        const new_user = new Usuario(IDUsuario, newPassword);
        // Llamar al método para actualizar la contraseña
        await new_user.updateContra();
        response.redirect('/auth/login'); // Redirigir al inicio de sesión después de la actualización
    } catch (error) {
        console.log(error);
        response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
        });
    }
};

