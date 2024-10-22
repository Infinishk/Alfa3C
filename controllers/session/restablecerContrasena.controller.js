const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Importa Nodemailer
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dotenv = require('dotenv');
const secretKey = config.jwtSecret;

dotenv.config();

// Configura el transportador de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Para Gmail
    port: 587, // o 465 si usas SSL
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
        user: process.env.SMTP_USER, // Tu usuario de SMTP
        pass: process.env.SMTP_PASSWORD // Tu contraseña de SMTP
    },
    tls: {
        rejectUnauthorized: false // Esto puede ayudar a evitar problemas de certificado
    }
});

exports.get_set_password = (request, response, next) => {
    const token = request.query.token;
    const IDUsuario = request.query.IDUsuario;  // Make sure IDUsuario is being passed here
    response.render('set_password', {
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        token,
        IDUsuario
    });
};

exports.post_set_password = async (request, response, next) => {
    const token = request.body.token;
    const newPassword = request.body.password;  

    // Verificar el token JWT
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token JWT:', err);
            response.redirect('/auth/login'); // Redirigir a la página de inicio de sesión en caso de error
        } else {
            // Token válido, proceder con la actualización de la contraseña
            try {
                const IDUsuario = decoded.IDUsuario;  // Make sure the correct user ID is extracted
                const new_user = new Usuario(IDUsuario, newPassword);
                await new_user.updateContra();
                response.redirect('/auth/login'); // Redirigir al inicio de sesión después de actualizar la contraseña
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                response.redirect('/auth/login'); // Redirigir a la página de configuración de contraseña en caso de error
            }
        }
    });
};
