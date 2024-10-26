const Usuario = require('../../models/usuario.model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = config.jwtSecret;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
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
    const {
        IDUsuario,
        nombre,
        apellidos,
        correoElectronico,
        rol,
        direccion,
        telefono,
        rfc,
        referenciaBancaria,
        porcentajeInteres,
        montoRetencion,
        tipoCliente
    } = req.body;

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
        await Usuario.saveUsuario(IDUsuario, nombre, apellidos, correoElectronico);

        // Confirm that the user was added to avoid foreign key issues
        const [newUser] = await Usuario.fetchOne(IDUsuario);
        if (newUser.length === 0) {
            throw new Error('User insertion failed; cannot proceed to assign role.');
        }

        // Guardar el cliente en la base de datos
        await Usuario.saveCliente(
            IDUsuario,
            direccion,
            telefono,
            rfc,
            referenciaBancaria,
            porcentajeInteres,
            montoRetencion,
            tipoCliente
        );

        // Asignar el rol según la selección
        const IDRol = rol === 'Admin' ? 'ROL01' : 'ROL02';
        
        // Save the role in the "posee" table
        await Usuario.saveRol(IDUsuario, IDRol);

        // Generate JWT token for password setup link
        const token = jwt.sign({ IDUsuario: IDUsuario }, secretKey, { expiresIn: '1h' });
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        // Configurar el correo electrónico de restablecimiento de contraseña
        const mailOptions = {
            from: {
                name: 'Alfa3C',
                address: 'Infinishk@gmail.com',
            },
            to: correoElectronico,
            subject: 'Reestablecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para restablecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Reestablecer Contraseña</a></p>`
        };

        // Enviar el correo electrónico
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error.toString());
        }

        // Redirección después del registro
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al registrar el usuario.');
    }
};
