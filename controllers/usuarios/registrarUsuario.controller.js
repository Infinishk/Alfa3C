const Usuario = require('../../models/usuario.model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = config.jwtSecret;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Para Gmail
    port: 587,
    secure: false, // true para puerto 465, false para otros puertos
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.getRegistrarUsuario = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('usuarios/registrarUsuario', {
        username: request.session.username || '',
        registrar: true,
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || '',
    });
};

exports.postRegistrarUsuario = async (req, res) => {
    const { IDUsuario, correoElectronico } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [usuarioExistente] = await Usuario.fetchOne(IDUsuario);
        
        if (usuarioExistente.length > 0) {
            return res.render('usuarios/registrarUsuario', {
                csrfToken: req.csrfToken(),
                error: true,
            });
        }

        // Guardar el usuario en la base de datos
        await Usuario.saveUsuario(IDUsuario, correoElectronico);

        // Generar token JWT con el nombre de usuario (IDUsuario)
        const token = jwt.sign({ IDUsuario: IDUsuario }, secretKey, { expiresIn: '1h' });

        // Enlace con el token incluido
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        // Configurar el mensaje de correo electrónico
        const mailOptions = {
            from: {
                name: 'Alfa3C',
                address: 'Infinishk@gmail.com', // Cambia esta dirección por la tuya
            },
            to: correoElectronico,
            subject: 'Reestablecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para restablecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Reestablecer Contraseña</a></p>`
        };

        // Enviar el correo electrónico usando Nodemailer
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error.toString());
        }

        // Redirección después de registrar al usuario
        res.redirect('/configuracion/consultar_usuario');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al registrar el usuario.');
    }
};
