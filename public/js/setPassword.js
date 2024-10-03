document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado correctamente");

    // Toggle para contraseña antigua (verificación)
    const PasswordField = document.getElementById('password');
    const togglePasswordCheckbox = document.getElementById('togglePassword');

    if (PasswordField && togglePasswordCheckbox) {
        togglePasswordCheckbox.addEventListener('change', function() {
            if (this.checked) {
                PasswordField.type = 'text';
            } else {
                PasswordField.type = 'password';
            }
        });
    }
});