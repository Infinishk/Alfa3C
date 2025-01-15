let currentToastTimeout; 

function showToast(message, type) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.classList.add('has-text-white');

    // Limpiar clases previas
    toast.classList.remove('notification-success', 'notification-delete');
    
    // Agregar clase según el tipo
    if (type == 0) {
        toast.classList.add('notification-success');
    } else if (type == 1) {
        toast.classList.add('notification-delete');
    }
    
    // Establecer el mensaje y mostrar el toast
    toastMessage.textContent = message;
    toast.classList.remove('is-hidden');

    if (currentToastTimeout) {
        clearTimeout(currentToastTimeout);
    }

    // Autocerrar después de 3 segundos
    currentToastTimeout = setTimeout(() => {
        toast.classList.add('is-hidden');
    }, 3000);
}

const showAlertModal = (message, title) => {
    document.getElementById('modalMessage').textContent = message; 
    document.getElementById('modalTitle').textContent = title; 
    document.getElementById('alertModal').classList.add('is-active'); 

    // Cerrar el modal
    document.getElementById('closeModal').onclick = function() {
        document.getElementById('alertModal').classList.remove('is-active');
    };

    document.querySelector('.modal-background').onclick = function() {
        document.getElementById('alertModal').classList.remove('is-active');
    };
};

export { showToast, showAlertModal };