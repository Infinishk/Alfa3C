document.addEventListener("DOMContentLoaded", function () {
    const tabUsuario = document.querySelector('#tab-usuario');
    const tabAdmin = document.querySelector('#tab-admin');

    function showUsuario() {
        tabUsuario.classList.add('is-active');
        tabAdmin.classList.remove('is-active');
        if (window.location.pathname !== "/usuarios/registrarUsuario") {
            window.location.href = "/usuarios/registrarUsuario";
        }
    }

    function showAdmin() {
        tabAdmin.classList.add('is-active');
        tabUsuario.classList.remove('is-active');
        if (window.location.pathname !== "/usuarios/registrarAdmin") {
            window.location.href = "/usuarios/registrarAdmin";
        }
    }

    tabUsuario.addEventListener('click', function (event) {
        event.preventDefault();
        showUsuario();
    });

    tabAdmin.addEventListener('click', function (event) {
        event.preventDefault();
        showAdmin();
    });
    showAdmin();
});
