import { textareaCounter } from '../components/textAreaCounter.js';
import { textInputCounter } from '../components/textInputCounter.js';
import { formatNumberCommas } from '../components/numberInputFormat.js';

// Inicializa contadores de caracteres
textareaCounter('notaPago');
textInputCounter('motivoPago');

// Elementos DOM
const elements = {
    contratoPago: document.getElementById('contratoPago'),
    fechaLimiteCard: document.getElementById('fechaLimiteCard'),
    montoAPagarCard: document.getElementById('montoAPagarCard'),
    montoPagadoCard: document.getElementById('montoPagadoCard'),
    montoPendienteCard: document.getElementById('montoPendienteCard'),
    montoPagoInput: document.getElementById('montoPago'),
    motivoPagoInput: document.getElementById('motivoPago'),
    openModal: document.getElementById('openPayButton'),
    motivoPagoWarning: document.getElementById('motivoPago-warning'),
    motivoPagoWarningText: document.getElementById('motivoPago-warning-text'),
    montoPagoWarning: document.getElementById('montoPago-warning'),
    montoPagoWarningText: document.getElementById('montoPago-warning-text'),
};

// Formatea número con comas y configuración de moneda
function formatCurrency(value, symbol) {
    if (symbol == true){
        return '$' + parseFloat(value).toLocaleString('mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        return parseFloat(value).toLocaleString('mx', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

}

// Actualiza las tarjetas de monto y fecha según selección
function actualizarTarjetas(selectedOption) {
    const selectedMonto = selectedOption.getAttribute('data-monto');
    const selectedDate = selectedOption.getAttribute('data-fecha-limite');
    const selectedPagado = selectedOption.getAttribute('data-monto-pagado');
    
    elements.fechaLimiteCard.textContent = selectedDate;
    elements.montoAPagarCard.textContent = formatCurrency(selectedMonto, true);
    elements.montoPagadoCard.textContent = formatCurrency(selectedPagado, true);
    
    const montoPendiente = calcularMontoPendiente(selectedMonto, selectedPagado, selectedRecargos, selectedInflacion);
    elements.montoPendienteCard.textContent = formatCurrency(montoPendiente, true);
    elements.montoPagoInput.value = formatCurrency(montoPendiente, false);
    elements.motivoPagoInput.value = `Pago de Renta: ${selectedOption.text}`;
    textInputCounter('motivoPago');
    checarContenido();
}

// Calcula el monto pendiente a pagar
function calcularMontoPendiente(monto, pagado, recargos, inflacion) {
    return parseFloat(monto) - parseFloat(pagado) + parseFloat(recargos) + parseFloat(inflacion);
}

// Verifica si el contenido de los campos es válido
function checarContenido() {
    const montoLimpio = parseFloat(elements.montoPagoInput.value.replace(/[^0-9.-]+/g, ''));
    elements.openModal.disabled = 
        !elements.motivoPagoInput.value.length ||
        !elements.montoPagoInput.value.length ||
        isNaN(montoLimpio) ||
        montoLimpio <= 0

    toggleWarning(elements.motivoPagoWarning, elements.motivoPagoWarningText, elements.motivoPagoInput.value.length === 0, 'Por favor ingresa un motivo de pago.');

    if (elements.montoPagoInput.value.length === 0) {
        toggleWarning(
            elements.montoPagoWarning, 
            elements.montoPagoWarningText, 
            true, 
            'Por favor ingresa un monto.'
        );
    } else {
        toggleWarning(
            elements.montoPagoWarning, 
            elements.montoPagoWarningText, 
            montoLimpio <= 0, 
            'Por favor ingresa un monto positivo.'
        );
    }
}

// Muestra u oculta advertencias
function toggleWarning(warningElement, warningTextElement, condition, message) {
    warningElement.classList.toggle('is-hidden', !condition);
    if (condition) {
        warningTextElement.textContent = message;
    }
}

// Maneja la apertura y el cierre del modal de confirmación
function abrirModal() {
    actualizarContenidoModal();
    document.getElementById(modalId).classList.add('is-active');
}

function actualizarContenidoModal() {
    const modalContent = {
        contrato: document.querySelector('select[name="contrato"]').selectedOptions[0].text,
        motivo: document.querySelector('input[name="motivo"]').value,
        monto: '$' + document.querySelector('input[name="monto"]').value,
        nota: document.querySelector('textarea[name="nota"]').value
    };

    document.getElementById(`${modalId}-contratoValue`).innerText = modalContent.contrato;
    document.getElementById(`${modalId}-motivoValue`).innerText = modalContent.motivo;
    document.getElementById(`${modalId}-montoValue`).innerText = modalContent.monto;
    document.getElementById(`${modalId}-notaValue`).innerText = modalContent.nota;
    
    const notaModal = document.getElementById(`${modalId}-notaModal`);
    notaModal.classList.toggle('is-hidden', !modalContent.nota);
}

// Asegúrate de que la inicialización de OpenPay esté antes de su uso
const openpay = new openpay('48204070', 'sk_c02b7cf0c33d4e24a4e289b0e195890c', false);

// Función para generar el token de pago
function generarTokenPago() {
    const cardData = {
        card_number: document.getElementById('cardNumber').value,
        holder_name: document.getElementById('cardHolderName').value,
        expiration_year: document.getElementById('cardExpiration').value.split('/')[1],
        expiration_month: document.getElementById('cardExpiration').value.split('/')[0],
        cvv2: document.getElementById('cardCVV').value,
    };

    // Llamada a OpenPay para generar el token
    openpay.cards.create(cardData, function(response) {
        if (response.error) {
            alert('Error al crear el token: ' + response.error.description);
        } else {
            // El token de la tarjeta
            const token = response.data.id;
            procesarPago(token);
        }
    });
}


// Función para procesar el pago
function procesarPago(token) {
    // Aquí envías el token al servidor para procesar el pago
    fetch('pagos/realizarPago', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, monto: document.getElementById('montoPago').value, motivo: document.getElementById('motivoPago').value }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pago realizado exitosamente');
        } else {
            alert('Hubo un error en el pago');
        }
    })
    .catch(error => {
        alert('Error al realizar el pago');
    });
}

// Evento para abrir el modal y generar el token
document.getElementById('submitPayment').addEventListener('click', function(event) {
    event.preventDefault();
    generarTokenPago();
});


// Inicialización de eventos y configuración
if (elements.contratoPago) {
    elements.contratoPago.addEventListener('change', function () {
        actualizarTarjetas(this.options[this.selectedIndex]);
    });
}

elements.motivoPagoInput.addEventListener('input', checarContenido);
elements.montoPagoInput.addEventListener('input', checarContenido);

const modalId = 'paymentModal';

document.getElementById('openPayButton').addEventListener('click', abrirModal);
document.getElementById('closeModal').onclick = () => document.getElementById(modalId).classList.remove('is-active');
document.querySelector('.modal-background').onclick = () => document.getElementById(modalId).classList.remove('is-active');

formatNumberCommas('montoPago');