window.modifyStatus = (userID, status) => {
    //El token de protección CSRF
    //const csrf = document.getElementById('_csrf').value;

    fetch('/usuarios/modifyUserStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'csrf-token': csrf
            },
            body: JSON.stringify({
                userID: userID,
                status: status
            })
        })
        .then((result) => {
            return result.json()
        })
        .then((data) => {
            let respuesta = document.getElementById('textCambio');

            if (data.status == 200){
                respuesta.textContent = "Ahora hay cambios";
            } else if (data.status == 500) {
                respuesta.textContent = "Ahora hay cambios";
            }

            setTimeout(function () {
                window.location.reload(); // Recargar la página
            }, 1500);
        })
        .catch(error => {
            console.error('Error en la petición fetch:', error);
        });
};