document.addEventListener("DOMContentLoaded", function () {
    // Select the tabs and field containers
    const tabUsuario = document.getElementById("tab-usuario");
    const tabAdmin = document.getElementById("tab-admin");
    const linkUsuario = document.getElementById("link-usuario");
    const linkAdmin = document.getElementById("link-admin");
    const usuarioFields = document.getElementById("usuario-fields");
    const adminFields = document.getElementById("admin-fields");

    // Function to show selected tab and hide others
    function showTab(tab) {
        if (tab === "usuario") {
            usuarioFields.style.display = "block";
            adminFields.style.display = "none";
            tabUsuario.classList.add("is-active");
            tabAdmin.classList.remove("is-active");
        } else if (tab === "admin") {
            usuarioFields.style.display = "none";
            adminFields.style.display = "block";
            tabAdmin.classList.add("is-active");
            tabUsuario.classList.remove("is-active");
        }
    }

    // Attach event listeners to tabs
    linkUsuario.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents default anchor behavior
        showTab("usuario");
    });

    linkAdmin.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents default anchor behavior
        showTab("admin");
    });

    // Initialize by showing the "Usuario" tab by default
    showTab("usuario");
});
