import { showToast, showAlertModal } from '../components/notifications.js';

const modifyStatus = (userID, status) => {
    // El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;

    fetch('/usuarios/modifyUserStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
            body: JSON.stringify({
                userID: userID,
                status: status
            })
        })
        .then((result) => result.json())
        .then((data) => {
            if (data.status === 200) {
                const statusButton = document.querySelector(`[data-user-id="${userID}"]`);
                const userRow = statusButton.closest('tr'); 
                const isAdmin = statusButton.getAttribute('data-user-admin') == '1'; 

                if (status == 1) {
                    statusButton.setAttribute('data-user-status', 0);
                    statusButton.textContent = 'Activar';
                    statusButton.classList.remove('is-link');
                    statusButton.classList.add('is-primary');

                    if (!isAdmin) { 
                        // Remover de la tabla de activos
                        const activeTable = document.getElementById('tbodyActivos');
                        activeTable.removeChild(userRow);

                        // Añadir a la tabla de no activos
                        const inactiveTable = document.getElementById('tbodyNoActivos');
                        inactiveTable.appendChild(userRow);
                    }
                } else if (status == 0) {
                    statusButton.setAttribute('data-user-status', 1);
                    statusButton.textContent = 'Desactivar';
                    statusButton.classList.remove('is-primary');
                    statusButton.classList.add('is-link');

                    if (!isAdmin) { 
                        // Remover de la tabla de no activos
                        const inactiveTable = document.getElementById('tbodyNoActivos');
                        inactiveTable.removeChild(userRow);

                        // Añadir a la tabla de activos
                        const activeTable = document.getElementById('tbodyActivos');
                        activeTable.appendChild(userRow);
                    }
                }

                checkTableContent('tbodyActivos', 'vacioActivo', 'searchActivos');
                checkTableContent('tbodyNoActivos', 'vacioNoActivo', 'searchNoActivos');

                const message = (status == 1) ? '¡Usuario desactivado!' : '¡Usuario activado!';
                showToast(message, status);
                
            } else {
                showAlertModal(
                    'Hubo un error al modificar el estatus del usuario. Por favor, verifica tu conexión a internet o intenta nuevamente más tarde.', 
                    '¡Error!');
            }
        })
        .catch(error => {
            console.error('Error en la petición fetch:', error);
        });
};

const checkTableContent = (tableBodyId, notificationId, searchId) => {
    const tableBody = document.getElementById(tableBodyId);
    const notification = document.getElementById(notificationId);
    const searchField = document.getElementById(searchId);

    if (tableBody.children.length === 0) {
        // Si la tabla está vacía, mostrar la notificación y ocultar la tabla
        notification.classList.remove('is-hidden');
        searchField.classList.add('is-hidden');
        tableBody.closest('table').classList.add('is-hidden');
    } else {
        // Si hay elementos en la tabla, ocultar la notificación y mostrar la tabla
        notification.classList.add('is-hidden');
        searchField.classList.remove('is-hidden');
        tableBody.closest('table').classList.remove('is-hidden');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const navActivos = document.getElementById('navActivos');
    const navNoActivos = document.getElementById('navNoActivos');
    const navAdmins = document.getElementById('navAdmins');
    const usuariosActivosSection = document.getElementById('usuariosActivos');
    const usuariosNoActivosSection = document.getElementById('usuariosNoActivos');
    const usuariosAdminsSection = document.getElementById('usuariosAdmins');

    const buttons = document.querySelectorAll('.modify-status-button');
    
    // Checar las tablas al cargar la página
    checkTableContent('tbodyActivos', 'vacioActivo', 'searchActivos');
    checkTableContent('tbodyNoActivos', 'vacioNoActivo', 'searchNoActivos');

    // Navegación entre pestañas de usuarios activos y no activos
    navActivos.addEventListener('click', function () {
        navActivos.classList.add('is-active');
        navNoActivos.classList.remove('is-active');
        navAdmins.classList.remove('is-active');
        usuariosActivosSection.classList.remove('is-hidden');
        usuariosNoActivosSection.classList.add('is-hidden')
        usuariosAdminsSection.classList.add('is-hidden');
    });

    navNoActivos.addEventListener('click', function () {
        navActivos.classList.remove('is-active');
        navNoActivos.classList.add('is-active');
        navAdmins.classList.remove('is-active');
        usuariosActivosSection.classList.add('is-hidden');
        usuariosNoActivosSection.classList.remove('is-hidden')
        usuariosAdminsSection.classList.add('is-hidden');
    });

    navAdmins.addEventListener('click', function () {
        navActivos.classList.remove('is-active');
        navNoActivos.classList.remove('is-active');
        navAdmins.classList.add('is-active');
        usuariosActivosSection.classList.add('is-hidden');
        usuariosNoActivosSection.classList.add('is-hidden')
        usuariosAdminsSection.classList.remove('is-hidden');
    });

    buttons.forEach(button => {
        // Añade la función al atributo onclick directamente
        button.onclick = function () {
            const userID = button.getAttribute('data-user-id');
            const status = button.getAttribute('data-user-status');
            modifyStatus(userID, status);
        };
    });

    const searchActivos = document.getElementById('searchActivos');
    const tbodyActivos = document.getElementById('tbodyActivos');
    const resultadoActivo = document.getElementById('resultadoActivo');
    const tablaActivos = document.getElementById('tablaActivos');

    if (searchActivos) {
        searchActivos.addEventListener('input', function () {
            const searchTerm = searchActivos.value.toLowerCase();
            const userRows = tbodyActivos.getElementsByClassName('user-row');
            let found = false;

            Array.from(userRows).forEach(row => {
                const userId = row.cells[0].textContent.toLowerCase();
                const email = row.cells[1].textContent.toLowerCase();

                if (userId.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                    found = true;
                } else {
                    row.style.display = 'none';
                }
            });

            resultadoActivo.classList.toggle('is-hidden', found);

            if (found === false) {
                tablaActivos.classList.add('is-hidden');
            } else {
                tablaActivos.classList.remove('is-hidden');
            }
        });
    }

    const searchNoActivos = document.getElementById('searchNoActivos');
    const tbodyNoActivos = document.getElementById('tbodyNoActivos');
    const resultadoNoActivo = document.getElementById('resultadoNoActivo');
    const tablaNoActivos = document.getElementById('tablaNoActivos');

    if (searchNoActivos) {
        searchNoActivos.addEventListener('input', function () {
            const searchTerm = searchNoActivos.value.toLowerCase();
            const userRows = tbodyNoActivos.getElementsByClassName('user-row');
            let found = false;

            Array.from(userRows).forEach(row => {
                const userId = row.cells[0].textContent.toLowerCase();
                const email = row.cells[1].textContent.toLowerCase();

                if (userId.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                    found = true;
                } else {
                    row.style.display = 'none';
                }
            });

            resultadoNoActivo.classList.toggle('is-hidden', found);

            if (found === false) {
                tablaNoActivos.classList.add('is-hidden');
            } else {
                tablaNoActivos.classList.remove('is-hidden');
            }
        });
    }

    const searchAdmins = document.getElementById('searchAdmins');
    const tbodyAdmins = document.getElementById('tbodyAdmins');
    const resultadoAdmin = document.getElementById('resultadoAdmin');
    const tablaAdmins = document.getElementById('tablaAdmins');

    if (searchAdmins) {
        searchAdmins.addEventListener('input', function () {
            const searchTerm = searchAdmins.value.toLowerCase();
            const userRows = tbodyAdmins.getElementsByClassName('user-row');
            let found = false;

            Array.from(userRows).forEach(row => {
                const userId = row.cells[0].textContent.toLowerCase();
                const email = row.cells[1].textContent.toLowerCase();

                if (userId.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                    found = true;
                } else {
                    row.style.display = 'none';
                }
            });

            resultadoAdmin.classList.toggle('is-hidden', found);

            if (found === false) {
                tablaAdmins.classList.add('is-hidden');
            } else {
                tablaAdmins.classList.remove('is-hidden');
            }
        });
    }
});