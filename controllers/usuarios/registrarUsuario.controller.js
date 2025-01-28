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
        nombre,
        apellidos,
        correoElectronico,
        direccion,
        telefono,
        rfc,
        referenciaBancaria,
        porcentajeInteres,
        montoRetencion,
        tipoCliente
    } = req.body;

    try {
        // Guardar el usuario en la base de datos
        const usuarioRegistrado = new Usuario(nombre, apellidos, correoElectronico);
        await usuarioRegistrado.saveUsuarioPrisma(nombre, apellidos, correoElectronico);

        // Confirm that the user was added to avoid foreign key issues
        const [newUser] = await Usuario.fetchOne(correoElectronico);
        if (newUser.length === 0) {
            throw new Error('User insertion failed; cannot proceed to assign role.');
        }

        // Guardar el cliente en la base de datos

        newUser.IDUsuario = newUser[0].IDUsuario;

        await Usuario.saveCliente(
            newUser.IDUsuario,
            direccion,
            telefono,
            rfc,
            referenciaBancaria,
            porcentajeInteres,
            montoRetencion,
            tipoCliente
        );

        // Asignar rol de usuario
        const IDRol = 'ROL02';
        
        // Save the role in the "posee" table
        await Usuario.saveRol(newUser.IDUsuario, IDRol);

        // Generate JWT token for password setup link
        const token = jwt.sign({ IDUsuario: newUser.IDUsuario }, secretKey, { expiresIn: '1h' });
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        // Configurar el correo electrónico de restablecimiento de contraseña
        const mailOptions = {
            from: {
                name: 'Alfa3C',
                address: 'Infinishk@gmail.com',
            },
            to: correoElectronico,
            subject: 'Establecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para establecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Establecer Contraseña</a></p>`
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

exports.getRegistrarAdmin = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('usuarios/registrarAdmin', {
        username: request.session.username || '',
        registrar: true,
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || '',
    });
};

exports.postRegistrarAdmin = async (req, res) => {
    const {
        nombre,
        apellidos,
        correoElectronico,
    } = req.body;

    try {
        // Guardar el usuario en la base de datos
        const usuarioRegistrado = new Usuario(nombre, apellidos, correoElectronico);
        await usuarioRegistrado.saveUsuarioPrisma(nombre, apellidos, correoElectronico);

        // Confirm that the user was added to avoid foreign key issues
        const [newUser] = await Usuario.fetchOne(correoElectronico);
        if (newUser.length === 0) {
            throw new Error('User insertion failed; cannot proceed to assign role.');
        }

        // Guardar el cliente en la base de datos
        newUser.IDUsuario = newUser[0].IDUsuario;

        // Asignar el rol de admin
        const IDRol = 'ROL01';
        
        // Save the role in the "posee" table
        await Usuario.saveRol(newUser.IDUsuario, IDRol);

        // Generate JWT token for password setup link
        const token = jwt.sign({ IDUsuario: newUser.IDUsuario }, secretKey, { expiresIn: '1h' });
        const setPasswordLink = `http://localhost:5050/auth/set_password?token=${token}`;

        // Configurar el correo electrónico de restablecimiento de contraseña
        const mailOptions = {
            from: {
                name: 'Alfa3C',
                address: 'Infinishk@gmail.com',
            },
            to: correoElectronico,
            subject: 'Establecer contraseña de Alfa3C',
            html: `<p>Hola!</p><p>Por favor usa este link para establecer tu contraseña. Toma en cuenta que la liga solo tiene validez de una hora: <a href="${setPasswordLink}">Establecer Contraseña</a></p>`
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

exports.validateNombre = (req, res) => {
    const nombre = req.body.nombre;

    // Expresión regular para detectar números
    const regex = /\d/;
    if (regex.test(nombre)) {
        res.json({ valid: false });
    } else {
        res.json({ valid: true });
    }
};

exports.validateApellidos = (req, res) => {
    const nombre = req.body.apellidos;

    const regex = /\d/;
    if (regex.test(nombre)) {
        res.json({ valid: false });
    } else {
        res.json({ valid: true });
    }
};

exports.validateCorreoElectronico = (req, res) => {
    const correo = req.body.correoElectronico;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    res.json({ valid: regex.test(correo) });
};

exports.validatePorcentajeInteres = (req, res) => {
    const porcentajeInteres = req.body.porcentajeInteres;
    const regex = /^(100(\.0{1,10})?|(\d{1,2})(\.\d{1,10})?)$/;

    const isValid = regex.test(porcentajeInteres);
    res.json({ valid: isValid });
};

exports.validateTelefono = (req, res) => {
    const telefono = req.body.telefono;
    const regex = /^\d+$/;
    res.json({ valid: regex.test(telefono) });
};