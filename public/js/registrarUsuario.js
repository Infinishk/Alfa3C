document.addEventListener("DOMContentLoaded", function () {
    // Selecciona las pestañas y los contenedores de campos
    const tabUsuario = document.querySelector('#tab-usuario');
    const tabAdmin = document.querySelector('#tab-admin');
    const usuarioFields = document.querySelector('#usuario-fields');
    const adminFields = document.querySelector('#admin-fields');

    // Función para mostrar la pestaña "Usuario" y ocultar "Admin"
    function showUsuario() {
        // Cambiar la pestaña activa
        tabUsuario.classList.add('is-active');
        tabAdmin.classList.remove('is-active');

        // Mostrar los campos de usuario y ocultar los de admin
        usuarioFields.classList.remove('is-hidden');
        adminFields.classList.add('is-hidden');
    }

    // Función para mostrar la pestaña "Admin" y ocultar "Usuario"
    function showAdmin() {
        // Cambiar la pestaña activa
        tabAdmin.classList.add('is-active');
        tabUsuario.classList.remove('is-active');

        // Mostrar los campos de admin y ocultar los de usuario
        adminFields.classList.remove('is-hidden');
        usuarioFields.classList.add('is-hidden');
        
    }

    // Event listeners para las pestañas
    tabUsuario.addEventListener('click', function (event) {
        event.preventDefault();
        showUsuario();
    });

    tabAdmin.addEventListener('click', function (event) {
        event.preventDefault();
        showAdmin();
    });

    // Inicializa mostrando la pestaña "Usuario" por defecto
    showUsuario();
});
