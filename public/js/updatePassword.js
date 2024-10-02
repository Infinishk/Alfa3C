document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado correctamente");

    // Toggle para contraseña antigua (verificación)
    const oldPasswordField = document.getElementById('oldPassword');
    const toggleOldPasswordCheckbox = document.getElementById('toggleOldPassword');

    if (oldPasswordField && toggleOldPasswordCheckbox) {
        toggleOldPasswordCheckbox.addEventListener('change', function() {
            if (this.checked) {
                oldPasswordField.type = 'text';
            } else {
                oldPasswordField.type = 'password';
            }
        });
    }

    // Toggle para nueva contraseña (actualización)
    const newPasswordField = document.getElementById('newPassword');
    const toggleNewPasswordCheckbox = document.getElementById('toggleNewPassword');

    if (newPasswordField && toggleNewPasswordCheckbox) {
        toggleNewPasswordCheckbox.addEventListener('change', function() {
            if (this.checked) {
                newPasswordField.type = 'text';
            } else {
                newPasswordField.type = 'password';
            }
        });
    }

    const newPasswordField2 = document.getElementById('newPassword2');
    const toggleNewPassword2Checkbox = document.getElementById('toggleNewPassword2');

    if (newPasswordField2 && toggleNewPassword2Checkbox) {
        toggleNewPassword2Checkbox.addEventListener('change', function() {
            if (this.checked) {
                newPasswordField2.type = 'text';
            } else {
                newPasswordField2.type = 'password';
            }
        });
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

