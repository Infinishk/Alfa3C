function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const toggleCheckbox = document.getElementById("toggle-password");
    if (toggleCheckbox) {
        toggleCheckbox.addEventListener("click", function () {
            togglePassword("password");
        });
    }
});