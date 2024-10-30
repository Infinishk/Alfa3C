import { textareaCounter } from '../components/textAreaCounter.js';
import { textInputCounter } from '../components/textInputCounter.js';
import { formatNumberCommas } from '../components/numberInputFormat.js';

// Inicializa contadores de caracteres
textareaCounter('notaPago');
textInputCounter('motivoPago');

// Elementos DOM
const elements = {
    contratoPago: document.getElementById('contratoPago'),
    fecheLimiteCard: document.getElementById('fechaLimiteCard'),
    montoAPagarCard: document.getElementById('montoAPagarCard'),
    montoPagadoCard: document.getElementById('montoPagadoCard'),
    recargosCard: document.getElementById('recargosCard'),
    recargosColumn: document.getElementById('recargosColumn'),
    inflacionCard: document.getElementById('inflacionCard'),
    inflacionColumn: document.getElementById('inflacionColumn'),
    montoPendienteCard: document.getElementById('montoPendienteCard'),
    montoPagoInput: document.getElementById('montoPago'),
    motivoPagoInput: document.getElementById('motivoPago'),
    fechaPagoInput: document.getElementById('fechaPago'),
    openModal: document.getElementById('openModal'),
    motivoPagoWarning: document.getElementById('motivoPago-warning'),
    motivoPagoWarningText: document.getElementById('motivoPago-warning-text'),
    montoPagoWarning: document.getElementById('montoPago-warning'),
    montoPagoWarningText: document.getElementById('montoPago-warning-text'),
    fechaPagoWarning: document.getElementById('fechaPago-warning'),
    fechaPagoWarningText: document.getElementById('fechaPago-warning-text')
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
    const selectedRecargos = selectedOption.getAttribute('data-recargos');
    const selectedInflacion = selectedOption.getAttribute('data-inflacion');

    elements.fecheLimiteCard.textContent = selectedDate;
    elements.montoAPagarCard.textContent = formatCurrency(selectedMonto, true);
    elements.montoPagadoCard.textContent = formatCurrency(selectedPagado, true);
    
    toggleVisibility(elements.recargosColumn, selectedRecargos > 0, elements.recargosCard, selectedRecargos);
    toggleVisibility(elements.inflacionColumn, selectedInflacion > 0, elements.inflacionCard, selectedInflacion);

    const montoPendiente = calcularMontoPendiente(selectedMonto, selectedPagado, selectedRecargos, selectedInflacion);
    elements.montoPendienteCard.textContent = formatCurrency(montoPendiente, true);
    elements.montoPagoInput.value = formatCurrency(montoPendiente, false);
    elements.motivoPagoInput.value = `Pago de Renta: ${selectedOption.text}`;
    textInputCounter('motivoPago');
    checarContenido();
}

// Muestra u oculta columnas de recargos e inflación
function toggleVisibility(column, condition, card, value) {
    column.classList.toggle('is-hidden', !condition);
    if (condition) {
        card.textContent = formatCurrency(value, true);
    }
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
        montoLimpio <= 0 ||
        !elements.fechaPagoInput._flatpickr.altInput.value.length;

    toggleWarning(elements.motivoPagoWarning, elements.motivoPagoWarningText, elements.motivoPagoInput.value.length === 0, 'Por favor ingresa un motivo de pago.');
    toggleWarning(elements.fechaPagoWarning, elements.fechaPagoWarningText, elements.fechaPagoInput._flatpickr.altInput.value.length === 0, 'Por favor selecciona una fecha de pago.');

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
        metodoPago: document.querySelector('select[name="metodo"]').value,
        fechaPago: document.querySelector('input[name="fechaPago"]')._flatpickr.altInput.value,
        nota: document.querySelector('textarea[name="nota"]').value
    };

    document.getElementById(`${modalId}-contratoValue`).innerText = modalContent.contrato;
    document.getElementById(`${modalId}-motivoValue`).innerText = modalContent.motivo;
    document.getElementById(`${modalId}-montoValue`).innerText = modalContent.monto;
    document.getElementById(`${modalId}-metodoPagoValue`).innerText = modalContent.metodoPago;
    document.getElementById(`${modalId}-fechaPagoValue`).innerText = modalContent.fechaPago;
    document.getElementById(`${modalId}-notaValue`).innerText = modalContent.nota;
    
    const notaModal = document.getElementById(`${modalId}-notaModal`);
    notaModal.classList.toggle('is-hidden', !modalContent.nota);
}

// Inicialización de eventos y configuración
if (elements.contratoPago) {
    elements.contratoPago.addEventListener('change', function () {
        actualizarTarjetas(this.options[this.selectedIndex]);
    });
}

elements.motivoPagoInput.addEventListener('input', checarContenido);
elements.montoPagoInput.addEventListener('input', checarContenido);
elements.fechaPagoInput.addEventListener('change', checarContenido);

const modalId = 'confirmationModal';

document.getElementById('openModal').addEventListener('click', abrirModal);
document.getElementById('closeModal').onclick = () => document.getElementById(modalId).classList.remove('is-active');
document.querySelector('.modal-background').onclick = () => document.getElementById(modalId).classList.remove('is-active');

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