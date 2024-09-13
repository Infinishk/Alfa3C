const Usuario = require('../../models/usuario.model');

exports.getUsuarios = async (request, response, next) => {

    try {
        const [activeUsers] =  await Usuario.fetchActiveUsers();
        const [inactiveUsers] = await Usuario.fetchInactiveUsers();
        const [adminUsers] = await Usuario.fetchAdmins();

        response.render('usuarios/consultarUsuarios', {
            csrfToken: request.csrfToken(),
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || '', 
            activeUsers: activeUsers, 
            inactiveUsers: inactiveUsers, 
            adminUsers: adminUsers
        });

    } catch {
        response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || ''
        });
    }

};