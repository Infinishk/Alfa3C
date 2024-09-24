const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Importa Nodemailer
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dotenv = require('dotenv')
const secretKey = config.jwtSecret;

exports.get_update_password = (request, response, next) => {
    response.render('configuracion/update_password', { 
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        verificar:true,
        actualizar:false
    });
}

exports.verify_password = async (request, response, next) => {
    const { password } = request.body;
    const user = await Usuario.fetchOne(request.session.IDUsuario);
    const match = await bcrypt.compare(password, user[0].Contrasena);

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