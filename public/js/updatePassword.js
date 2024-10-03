document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado correctamente");

    // Función para alternar el tipo de input y el ícono
    function togglePasswordVisibility(passwordField, icon) {
        icon.addEventListener('click', function() {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // Toggle para contraseña antigua
    const oldPasswordField = document.getElementById('oldPassword');
    const toggleOldPasswordIcon = document.getElementById('toggleOldPasswordIcon');
    if (oldPasswordField && toggleOldPasswordIcon) {
        togglePasswordVisibility(oldPasswordField, toggleOldPasswordIcon);
    }

    // Toggle para nueva contraseña
    const newPasswordField = document.getElementById('newPassword');
    const toggleNewPasswordIcon = document.getElementById('toggleNewPasswordIcon');
    if (newPasswordField && toggleNewPasswordIcon) {
        togglePasswordVisibility(newPasswordField, toggleNewPasswordIcon);
    }

    // Toggle para confirmar nueva contraseña
    const newPasswordField2 = document.getElementById('newPassword2');
    const toggleNewPassword2Icon = document.getElementById('toggleNewPassword2Icon');
    if (newPasswordField2 && toggleNewPassword2Icon) {
        togglePasswordVisibility(newPasswordField2, toggleNewPassword2Icon);
    }

    // Habilitar/deshabilitar el botón de actualización de contraseña
    const guardarBtn = document.getElementById('guardarBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Función para comprobar si las contraseñas coinciden
    function checkPasswords() {
        if (newPasswordField.value === newPasswordField2.value) {
            guardarBtn.disabled = false;
            errorMessage.textContent = ''; // Limpiar mensaje de error
        } else {
            guardarBtn.disabled = true;
            errorMessage.textContent = 'Las contraseñas no coinciden.'; // Mensaje de error
        }
    }

    // Escuchar cambios en los campos de contraseña
    newPasswordField.addEventListener('input', checkPasswords);
    newPasswordField2.addEventListener('input', checkPasswords);
});
