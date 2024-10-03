document.addEventListener("DOMContentLoaded", function() {
    const correoInput = document.getElementById('correo');
    const guardarBtn = document.getElementById('guardarBtn');

    // Habilitar/deshabilitar el botón dependiendo si hay texto en el campo de correo
    correoInput.addEventListener('input', function() {
        guardarBtn.disabled = correoInput.value.trim() === ""; // Habilitar si hay texto, deshabilitar si está vacío
    });
});
