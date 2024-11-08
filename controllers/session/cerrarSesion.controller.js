exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/auth/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};