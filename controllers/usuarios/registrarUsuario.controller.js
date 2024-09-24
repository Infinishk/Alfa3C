const Usuario = require('../../models/usuario.model');


exports.getRegistrarUsuario= (request, response, next) => {
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


        await Usuario.saveUsuario(IDUsuario, correoElectronico);
        
        // Redirección
        res.redirect('');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al registrar el usuario.');
    }
};
