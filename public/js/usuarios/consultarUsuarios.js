window.modifyStatus = (userID, status) => {
    //El token de protección CSRF
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
        .then((response) => {
            
            console.log(response);
        })
        .catch(error => {
            console.error('Error en la petición fetch:', error);
        });
};