const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Importa Nodemailer
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dotenv = require('dotenv')
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

exports.get_reset_password = (request, response, next) => {
    response.render('reset_password', { 
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
};

exports.post_reset_password = async (request, response, next) => {
    const correo = request.body.correo;
    const matricula = await Usuario.fetchUser(correo);

    if (matricula && matricula[0] && matricula[0][0] && typeof matricula[0][0].IDUsuario !== 'undefined') {
        const user = matricula[0][0].IDUsuario;

        // Generar token JWT con la matrícula del usuario
        const token = jwt.sign({ matricula: user }, secretKey, { expiresIn: '1h' });
        
        // Enlace con el token incluido
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        // Configurar el mensaje de correo
        const mailOptions = {
            from: {
                name: 'Alfa3C',
                address: 'Infinishk@gmail.com', // Cambia esta dirección por la tuya
            },
            to: correo,
            subject: 'Reestablecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para restablecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Reestablecer Contraseña</a></p>`
        };

        try {
            // Envía el correo electrónico
            await transporter.sendMail(mailOptions);
            console.log('Correo electrónico enviado correctamente');
            response.redirect('/auth/login');
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error.toString());
            response.redirect('/auth/login');
        }
    } else {
        response.redirect('/auth/login');
    }
};

exports.get_set_password = (request, response, next) => {
    const token = request.query.token;
    const matricula = request.query.matricula;
    response.render('set_password', {
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
        token,
        matricula
    });
};

exports.post_set_password = async (request, response, next) => {
    const token = request.body.token;
    const newPassword = request.body.newPassword;

    // Verificar el token JWT
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token JWT:', err);
            response.redirect('/auth/login'); // Redirigir a la página de inicio de sesión en caso de error
        } else {
            // Token válido, proceder con la actualización de la contraseña
            try {
                const matricula = decoded.matricula; // Obtener la matrícula del token decodificado
                const new_user = new Usuario(matricula, newPassword);
                await new_user.updateContra();
                response.redirect('/auth/login'); // Redirigir al inicio de sesión después de actualizar la contraseña
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
                response.redirect('/auth/login'); // Redirigir a la página de configuración de contraseña en caso de error
            }
        }
    });
};