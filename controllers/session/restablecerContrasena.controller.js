const Usuario = require('../../models/usuario.model');

const bcrypt = require('bcryptjs');

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const jwt = require('jsonwebtoken');

const config = require('../../config');

const secretKey = config.jwtSecret;

exports.get_reset_password = (request,response,next) => {
    response.render('reset_password', { 
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
}

exports.post_reset_password = async (request, response, next) => {
    const correo = request.body.correo;
    const matricula = await Usuario.fetchUser(correo);

    if (matricula && matricula[0] && matricula[0][0] && typeof matricula[0][0].IDUsuario !== 'undefined') {
        const user = matricula[0][0].IDUsuario;
        console.log(user);

        // Generar token JWT con la matrícula del usuario
        const token = jwt.sign({ matricula: user }, secretKey, { expiresIn: '1h' });
        
        // Enlace con el token incluido
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        const msg = {
            to: correo,
            from: {
                name: 'Alfa3C',
                email: '27miguelb11@gmail.com',
            },
            subject: 'Reestablecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para restablecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Reestablecer Contraseña</a></p>`
        };

        try {
            await sgMail.send(msg);
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
