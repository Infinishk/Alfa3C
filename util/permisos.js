module.exports = (requiredPermission) => {
    return (request, response, next) => {
        let tienePermiso = false;
        const permisos = request.session.permisos || [];
        
        // Verificar si el permiso requerido está en el arreglo de permisos del usuario
        for (const permiso of permisos) {
            if (permiso.funcion == requiredPermission) {
                tienePermiso = true;
            }
        }
        
        if (tienePermiso) {
            next(); // Permitir el acceso
        } else {
            response.redirect('/auth/logout'); 
        }
    };
};