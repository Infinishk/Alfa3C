const Usuario = require('../../models/usuario.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Importa Nodemailer
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dotenv = require('dotenv')
const secretKey = config.jwtSecret;

dotenv.config()

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
}

exports.post_reset_password = async (request, response, next) => {
    const correo = request.body.correo;
    const matricula = await Usuario.fetchUser(correo);

    console.log(process.env.SMTP_USER); // Debería mostrar tu correo electrónico
    console.log(process.env.SMTP_PASSWORD); // Debería mostrar tu contraseña

    if (matricula && matricula[0] && matricula[0][0] && typeof matricula[0][0].IDUsuario !== 'undefined') {
        const user = matricula[0][0].IDUsuario;
        console.log(user);

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
}

