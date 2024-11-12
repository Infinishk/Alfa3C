
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona las pestañas y los contenedores de campos
    const tabUsuario = document.querySelector('#tab-usuario');
    const tabAdmin = document.querySelector('#tab-admin');

    // Función para mostrar la pestaña "Usuario" y ocultar "Admin"
    function showUsuario() {
        tabUsuario.classList.add('is-active');
        tabAdmin.classList.remove('is-active');
        // Solo redirige si actualmente no estamos en registrarUsuario
        if (window.location.pathname !== "/usuarios/registrarUsuario") {
            window.location.href = "/usuarios/registrarUsuario";
        }
    }

    // Función para mostrar la pestaña "Admin" y ocultar "Usuario"
    function showAdmin() {
        tabAdmin.classList.add('is-active');
        tabUsuario.classList.remove('is-active');
        // Solo redirige si actualmente no estamos en registrarAdmin
        if (window.location.pathname !== "/usuarios/registrarAdmin") {
            window.location.href = "/usuarios/registrarAdmin";
        }
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
});


document.addEventListener('DOMContentLoaded', function() {
    const inputs = {
        nombre: document.getElementById('nombre'),
        apellidos: document.getElementById('apellidos'),
        correoElectronico: document.getElementById('correoElectronico'),
        telefono: document.getElementById('telefono'),
        porcentajeInteres: document.getElementById('porcentajeInteres')
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
    validarCampo(inputs.porcentajeInteres, '/usuarios/validatePorcentajeInteres', 'Favor de escribir un porcentaje válido (0-100).');
    validarCampo(inputs.telefono, '/usuarios/validateTelefono', 'El teléfono solo puede contener números.');
});
