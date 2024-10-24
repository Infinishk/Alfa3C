const Renta = require('../../models/renta.model');

// Configuras a moment con el locale. 
const moment = require('moment-timezone');
moment.locale('es-mx');

// Para usar numeros con decimales precisos
const Decimal = require('decimal.js');

exports.setRecargos = (request, response, next) => {
    const fechaActual = moment().tz('America/Mexico_City').format();
    
    Renta.fetchRentasPeriodo(fechaActual)
    .then(async ([rentaNoPagadas, fieldData]) => {
        for (const renta of rentaNoPagadas) {
            const [cliente] = await Renta.getRecargosCliente(renta.IDCliente);
    
            // De las deudas que no están pagadas y no tengan recargos se guarda el monto a Pagar
            const montoPagar = renta.montoAPagar;
            // Calculas los recargos del inquilino
            const montoRecargo = new Decimal(montoPagar).times((cliente[0].PorcentajeInteres / 100));
    
            Renta.setRecargosRenta(renta.IDRenta, montoRecargo.toFixed(2));
        }
    });
};