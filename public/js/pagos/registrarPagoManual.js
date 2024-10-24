const contratoPago = document.getElementById('contratoPago');
const montoPagoInput = document.getElementById('montoPago');
const fecheLimiteCard = document.getElementById('fechaLimiteCard');

if (contratoPago) {
    contratoPago.addEventListener('change', function () {
        const selectedOption = contratoPago.options[contratoPago.selectedIndex];
        const selectedMonto = selectedOption.getAttribute('data-monto');
        const selectedDate = selectedOption.getAttribute('data-fecha-limite');

        if (selectedMonto) {
            montoPagoInput.value = selectedMonto;
            fecheLimiteCard.textContent = selectedDate;
        }
    });
}