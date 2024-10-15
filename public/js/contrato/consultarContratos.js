document.addEventListener("DOMContentLoaded", function() {
    // Event Listeners para los tambs
    document.getElementById("tab_activos").addEventListener("click", contratos_activos);
    document.getElementById("tab_inactivos").addEventListener("click", contratos_inactivos);
});

/* Funciones para alternar entre contratos activos y no activos */
function contratos_activos() {
    const tab_inactivos = document.querySelector('#tab_inactivos');
    const tab_activos = document.querySelector('#tab_activos');

    tab_inactivos.classList.remove('is-active');
    tab_activos.classList.add('is-active');

    const contratos_inactivos = document.querySelector('#contratos_inactivos');
    contratos_inactivos.classList.add('is-hidden');

    const contratos_activos = document.querySelector('#contratos_activos');
    contratos_activos.classList.remove('is-hidden');
}

function contratos_inactivos() {
    const tab_inactivos = document.querySelector('#tab_inactivos');
    const tab_activos = document.querySelector('#tab_activos');

    tab_inactivos.classList.add('is-active');
    tab_activos.classList.remove('is-active');

    const contratos_inactivos = document.querySelector('#contratos_inactivos');
    contratos_inactivos.classList.remove('is-hidden');

    const contratos_activos = document.querySelector('#contratos_activos');
    contratos_activos.classList.add('is-hidden');
}
