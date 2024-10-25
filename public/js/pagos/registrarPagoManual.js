const contratoPago = document.getElementById('contratoPago');
const montoPagoInput = document.getElementById('montoPago');
const fecheLimiteCard = document.getElementById('fechaLimiteCard');
const montoAPagarCard = document.getElementById('montoAPagarCard');
const montoPagadoCard = document.getElementById('montoPagadoCard');
const recargosCard = document.getElementById('recargosCard');
const recargosColumn = document.getElementById('recargosColumn');
const inflacionCard = document.getElementById('inflacionCard');
const inflacionColumn = document.getElementById('inflacionColumn');
const montoPendienteCard = document.getElementById('montoPendienteCard');
const motivoPagoInput = document.getElementById('motivoPago');

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

            montoPagoInput.value = montoPendiente;

            motivoPagoInput.value = 'Pago de Renta: ' + selectedOption.text;
        }
    });
}