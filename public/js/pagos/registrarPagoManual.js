import { textareaCounter } from '../components/textAreaCounter.js';
import { textInputCounter } from '../components/textInputCounter.js';
import { formatNumberCommas } from '../components/numberInputFormat.js';

textareaCounter('notaPago');
textInputCounter('motivoPago');

const contratoPago = document.getElementById('contratoPago');
const fecheLimiteCard = document.getElementById('fechaLimiteCard');
const montoAPagarCard = document.getElementById('montoAPagarCard');
const montoPagadoCard = document.getElementById('montoPagadoCard');
const recargosCard = document.getElementById('recargosCard');
const recargosColumn = document.getElementById('recargosColumn');
const inflacionCard = document.getElementById('inflacionCard');
const inflacionColumn = document.getElementById('inflacionColumn');
const montoPendienteCard = document.getElementById('montoPendienteCard');
const montoPagoInput = document.getElementById('montoPago');
const motivoPagoInput = document.getElementById('motivoPago');
const openModal = document.getElementById('openModal');
const notaModal = document.getElementById('notaModal');
const motivoPagoWarning = document.getElementById('motivoPago-warning');
const motivoPagoWarningText = document.getElementById('motivoPago-warning-text');
const montoPagoWarning = document.getElementById('montoPago-warning');
const montoPagoWarningText = document.getElementById('montoPago-warning-text');

if (contratoPago) {
    contratoPago.addEventListener('change', function () {
        const selectedOption = contratoPago.options[contratoPago.selectedIndex];
        const selectedMonto = selectedOption.getAttribute('data-monto');
        const selectedDate = selectedOption.getAttribute('data-fecha-limite');
        const selectedPagado = selectedOption.getAttribute('data-monto-pagado');
        const selectedRecargos = selectedOption.getAttribute('data-recargos');
        const selectedInflacion = selectedOption.getAttribute('data-inflacion');

        if (selectedMonto) {
            fecheLimiteCard.textContent = selectedDate;
            montoAPagarCard.textContent = '$' + parseFloat(selectedMonto).toLocaleString('mx', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
            montoPagadoCard.textContent = '$' + parseFloat(selectedPagado).toLocaleString('mx', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });

            if (selectedRecargos > 0) {
                recargosColumn.classList.remove('is-hidden');
                recargosCard.textContent = '$' + parseFloat(selectedRecargos).toLocaleString('mx', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
            } else {
                recargosColumn.classList.add('is-hidden');
            }

            if (selectedInflacion > 0) {
                inflacionColumn.classList.remove('is-hidden');
                inflacionCard.textContent = '$' + parseFloat(selectedInflacion).toLocaleString('mx', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
            } else {
                inflacionColumn.classList.add('is-hidden');
            }

            const montoPendiente = parseFloat(selectedMonto) - parseFloat(selectedPagado) 
            + parseFloat(selectedRecargos) + parseFloat(selectedInflacion);

            montoPendienteCard.textContent = '$' + montoPendiente.toLocaleString('mx', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });

            montoPagoInput.value = montoPendiente.toLocaleString('mx', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });

            motivoPagoInput.value = 'Pago de Renta: ' + selectedOption.text;
            textInputCounter('motivoPago');
            checarContenido();
        }
    });
}

function checarContenido() {
    const montoLimpio = parseFloat(montoPagoInput.value.replace(/[^0-9.-]+/g, ''));
    openModal.disabled = motivoPagoInput.value.length === 0 || montoPagoInput.value.length === 0 ||
        isNaN(montoLimpio) || montoLimpio <= 0;

    if (motivoPagoInput.value.length === 0) {
        motivoPagoWarning.classList.remove('is-hidden');
        motivoPagoWarningText.textContent = 'Por favor ingresa un motivo de pago.';
    } else {
        motivoPagoWarning.classList.add('is-hidden');
    }

    if (montoPagoInput.value.length === 0) {
        montoPagoWarning.classList.remove('is-hidden');
        montoPagoWarningText.textContent = 'Por favor ingresa un monto.';
    } else if (isNaN(montoLimpio) || montoLimpio <= 0) {
        montoPagoWarning.classList.remove('is-hidden');
        montoPagoWarningText.textContent = 'Por favor ingresa un monto positivo.';
    } else {
        montoPagoWarning.classList.add('is-hidden');
    }
}

motivoPagoInput.addEventListener('input', checarContenido);
montoPagoInput.addEventListener('input', checarContenido);

document.getElementById('openModal').addEventListener('click', function() {
    document.getElementById('contractValue').innerText = document.querySelector('select[name="contrato"]').selectedOptions[0].text;
    document.getElementById('reasonValue').innerText = document.querySelector('input[name="motivo"]').value;
    document.getElementById('amountValue').innerText = '$' + (document.querySelector('input[name="monto"]').value);
    document.getElementById('paymentMethodValue').innerText = document.querySelector('select[name="metodo"]').value;
    document.getElementById('noteValue').innerText = document.querySelector('textarea[name="nota"]').value;

    if (document.querySelector('textarea[name="nota"]').value === '') {
        notaModal.classList.add('is-hidden');
    } else {
        notaModal.classList.remove('is-hidden');
    }

    document.getElementById('confirmationModal').classList.add('is-active');
});

document.getElementById('closeModal').onclick = function() {
    document.getElementById('confirmationModal').classList.remove('is-active');
};

document.querySelector('.modal-background').onclick = function() {
    document.getElementById('confirmationModal').classList.remove('is-active');
};

formatNumberCommas('montoPago');

/* global flatpickr */

flatpickr("#fechaPago", {
    enableTime: false,
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    minDate: "2000-01",
    maxDate: "today",
    defaultDate: "today",
    locale: "es"
});