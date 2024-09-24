const Usuario = require('../../models/usuario.model');

exports.getLogin = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        username: request.session.username || '',
        registrar: false,
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || '',
    });
};

exports.postLogin = (request, response, next) => {
    Usuario.fetchOne(request.body.IDUsuario)
        .then(([users, fieldData]) => {
            if (users.length == 1) {
                const user = users[0];
                
                // HAY QUE CIFRAR
                if (request.body.password === user.Contraseña) {
                    if (user.usuarioActivo == 1) {
                        Usuario.getPermisos(user.IDUsuario)
                            .then(([permisos, fieldData]) => {
                                Usuario.getRol(user.IDUsuario)
                                    .then(([rol, fieldData]) => {
                                        request.session.isLoggedIn = true;
                                        request.session.permisos = permisos;
                                        request.session.rol = rol[0].IDRol;
                                        request.session.username = user.IDUsuario;
                                        return request.session.save(err => {
                                            response.redirect('/');
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        request.session.error = 'El usuario insertado ya no está activo en el sistema. Por favor busca ayuda si requieres iniciar sesión.';
                        response.redirect('/auth/login');
                    }
                } else {
                    request.session.error = 'El usuario y/o contraseña son incorrectos.';
                    return response.redirect('/auth/login');
                }
            } else {
                request.session.error = 'El usuario y/o contraseña son incorrectos.';
                response.redirect('/auth/login');
            }
        })
        .catch((error) => {
            response.status(500).render('500', {
                username: request.session.username || '',
                permisos: request.session.permisos || [],
                rol: request.session.rol || '',
                errorAlumno: false
            });
            console.log(error);
        });
};
