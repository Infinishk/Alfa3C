document.addEventListener("DOMContentLoaded", function() {
    // Event Listeners para los tambs
    document.getElementById("tab_edoCuenta").addEventListener("click", edo_cuenta);
    document.getElementById("tab_historial").addEventListener("click", historial);
    document.getElementById("tab_contratos").addEventListener("click", contratos);
});

/* Funciones para alternar entre edo cuenta, historial y contratos */
function edo_cuenta() {
    const tab_historial = document.querySelector('#tab_historial');
    const tab_contratos = document.querySelector('#tab_contratos');
    const tab_edoCuenta = document.querySelector('#tab_edoCuenta');

    tab_historial.classList.remove('is-active');
    tab_contratos.classList.remove('is-active');
    tab_edoCuenta.classList.add('is-active');

    const historial = document.querySelector('#historial');
    const contratos = document.querySelector('#contratos');
    historial.classList.add('is-hidden');
    contratos.classList.add('is-hidden');

    const edo_cuenta = document.querySelector('#edoCuenta');
    edo_cuenta.classList.remove('is-hidden');
}

function historial() {
    const tab_historial = document.querySelector('#tab_historial');
    const tab_contratos = document.querySelector('#tab_contratos');
    const tab_edoCuenta = document.querySelector('#tab_edoCuenta');

    tab_historial.classList.add('is-active');
    tab_contratos.classList.remove('is-active');
    tab_edoCuenta.classList.remove('is-active');

    const edo_cuenta = document.querySelector('#edoCuenta');
    const contratos = document.querySelector('#contratos');
    edo_cuenta.classList.add('is-hidden');
    contratos.classList.add('is-hidden');

    const historial = document.querySelector('#historial');
    historial.classList.remove('is-hidden');
}

function contratos() {
    const tab_historial = document.querySelector('#tab_historial');
    const tab_contratos = document.querySelector('#tab_contratos');
    const tab_edoCuenta = document.querySelector('#tab_edoCuenta');

    tab_historial.classList.remove('is-active');
    tab_contratos.classList.add('is-active');
    tab_edoCuenta.classList.remove('is-active');

    const edo_cuenta = document.querySelector('#edoCuenta');
    const historial = document.querySelector('#historial');
    edo_cuenta.classList.add('is-hidden');
    historial.classList.add('is-hidden');

    const contratos = document.querySelector('#contratos');
    contratos.classList.remove('is-hidden');
}