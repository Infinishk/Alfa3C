document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitBtn");
    const errorMessage = document.getElementById("errorMessage");
    const inputs = document.querySelectorAll("input[type='text']");
    const numberInput = document.getElementById("numMeses");
    const inflacionInput = document.getElementById("inflacion");

    function validateForm() {
        let isValid = true;

        // Verificar si los campos de texto están vacíos
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
            }
        });

        // Verificar si el número de meses es menor o igual a 0 o tiene exponentes
        const numberValue = parseFloat(numberInput.value);
        if (isNaN(numberValue) || numberValue <= 0 || /e/i.test(numberInput.value)) {
            isValid = false;
        }

        const inflacionValue = parseFloat(inflacionInput.value);
        if (isNaN(inflacionValue) || inflacionValue <= 0 || /e/i.test(inflacionInput.value)) {
            isValid = false;
        }

        // Habilitar o deshabilitar el botón de envío
        submitButton.disabled = !isValid;

        // Mostrar u ocultar el mensaje de error
        if (!isValid) {
            errorMessage.style.display = "inline";
        } else {
            errorMessage.style.display = "none";
        }
    }

    // Escuchar cambios en los campos de texto
    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });

    // Escuchar cambios en el campo de número
    numberInput.addEventListener("input", validateForm);

    // Escuchar cambios en el campo de inflacion
    inflacionInput.addEventListener("input", validateForm);

    // Ejecutar la validación al cargar la página
    validateForm();
});
