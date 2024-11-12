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

document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        nombre: document.getElementById('nombre'),
        apellidos: document.getElementById('apellidos'),
        correoElectronico: document.getElementById('correoElectronico'),
    };
    const submitButton = document.getElementById('registrar');
    const mensajeError = document.getElementById('mensajeError');
    const csrfToken = document.querySelector('input[name="_csrf"]').value;

    function validarCampo(campo, url, mensajeErrorTexto) {
        campo.addEventListener('input', function() {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ [campo.id]: campo.value })
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    submitButton.disabled = false;
                    mensajeError.textContent = '';
                } else {
                    submitButton.disabled = true;
                    mensajeError.textContent = mensajeErrorTexto;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    validarCampo(inputs.nombre, '/usuarios/validateNombre', 'El nombre no puede contener números.');
    validarCampo(inputs.apellidos, '/usuarios/validateApellidos', 'El apellido no puede contener números.');
    validarCampo(inputs.correoElectronico, '/usuarios/validateCorreoElectronico', 'Correo electrónico inválido.');
});
