document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los switches
    const switches = document.querySelectorAll('.estatus-switch');
    
    switches.forEach(function(switchEstatus) {
        // Identificar cambios en el switch
        switchEstatus.addEventListener('change', function(event) {
            const contratoID = event.target.id.split('-')[1]; // Obtener la id
            const status = event.target.checked ? 1 : 0; // Definir el nuevo estatus

            // Llamar función para modificar estatus
            modificar_estatus(status, contratoID);
        });
    });
});

const modificar_estatus = (estatus, id) => {
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;

    fetch('/contrato/modificar_estatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'csrf-token': csrf
            },
            body: JSON.stringify({
                estatus: estatus,
                id: id
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            document.getElementById('banner_estatus').classList.remove('is-hidden');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Recargar la página después de mostrar la notificación por 3 segundos (3000 milisegundos)
            setTimeout(function () {
                window.location.reload(); // Recargar la página
            }, 3000);
        })
        .catch(error => {
            console.error('Error en la petición fetch:', error);
        });
};