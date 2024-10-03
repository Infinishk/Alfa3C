document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('togglePasswordIcon').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const icon = document.getElementById('togglePasswordIcon');
        
        // Alternar entre mostrar y ocultar la contraseña
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
    

});
