document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const icon = document.getElementById('togglePasswordIcon');
    const guardarBtn = document.getElementById('guardarBtn');

    // Alternar entre mostrar y ocultar la contraseña
    icon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // Habilitar/deshabilitar el botón dependiendo si hay texto en el campo de contraseña
    passwordInput.addEventListener('input', function() {
        guardarBtn.disabled = passwordInput.value.trim() === ""; // Habilitar si hay texto, deshabilitar si está vacío
    });
});