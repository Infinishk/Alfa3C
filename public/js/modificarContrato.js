// registrarContrato.js

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos los elementos del formulario
    const form = document.querySelector("form");
    const tituloInput = document.getElementById("titulo");
    const numMesesInput = document.getElementById("numMeses");
    const nombreEmpresaInput = document.getElementById("nombreEmpresa");
    const razonSocialInput = document.getElementById("razonSocial");
    const submitButton = form.querySelector("button[type='submit']");
    const alerta = document.getElementById("errorMessage");

    // Función para validar los campos
    function validateForm() {
        let isValid = true;

        // Validar campo Título
        if (tituloInput.value.trim() === "") {
            isValid = false;
        }

        // Validar campo Número de Meses
        if (numMesesInput.value.trim() === "" || isNaN(numMesesInput.value) || Number(numMesesInput.value) <= 0) {
            isValid = false;
        }

        // Validar campo Nombre de Empresa
        if (nombreEmpresaInput.value.trim() === "") {
            isValid = false;
        }

        // Validar campo Referencia Bancaria
        if (razonSocialInput.value.trim() === "") {
            isValid = false;
        }

        // Actualizar el estado del botón de envío
        submitButton.disabled = !isValid;

        // Mostrar/ocultar el mensaje de error
        if (!isValid) {
            alerta.style.display = "block";
            alerta.textContent = "Por favor ingresa correctamente todos los datos";
        } else {
            alerta.style.display = "none";
        }
    }

    // Agregamos eventos para validar en tiempo real
    tituloInput.addEventListener("input", validateForm);
    numMesesInput.addEventListener("input", validateForm);
    nombreEmpresaInput.addEventListener("input", validateForm);
    razonSocialInput.addEventListener("input", validateForm);

    // Validar el formulario al enviar
    form.addEventListener("submit", function(event) {
        validateForm();
        if (submitButton.disabled) {
            event.preventDefault(); // Evitar el envío si el formulario no es válido
        }
    });
});
