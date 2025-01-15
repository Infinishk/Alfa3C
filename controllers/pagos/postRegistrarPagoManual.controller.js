const Renta = require('../../models/renta.model');
const Pago = require('../../models/pago.model');

// Configuras a moment con el locale. 
const moment = require('moment-timezone');
moment.locale('es-mx');

exports.postRegistrarPagoManual = async (request, response, next) => {

    Renta.fetchNoPagadasContrato(request.body.contrato)
    .then(async (rentasNoPagadas) => {
        try {
            const montoSinCommas = parseFloat(request.body.monto.replace(/,/g, ''));
            const fechaPago = moment(request.body.fechaPago, 'YYYY-MM-DD').tz('America/Mexico_City');
            const pagoUsuario = 
                new Pago(rentasNoPagadas[0].IDRenta, request.body.motivo, montoSinCommas, 
                    request.body.nota, request.body.metodo, fechaPago.format('YYYY-MM-DD HH:mm:ss'));

            await pagoUsuario.savePagoManual();

            let montoUsuario = montoSinCommas;

            for (const renta of rentasNoPagadas) {
                let montoAUsar = 0;
                const montoPendiente = (parseFloat(renta.MontoAPagar) - parseFloat(renta.MontoPagado)) 
                + parseFloat(renta.Recargos) + parseFloat(renta.MontoInflacion);

                if (montoUsuario <= 0) {
                    break;
                } else if (montoPendiente <= montoUsuario) {
                    montoAUsar = montoPendiente;
                    montoUsuario = montoUsuario - montoPendiente;
                    await Renta.updateRenta(montoAUsar, renta.IDRenta);
                } else if (montoPendiente > montoUsuario) {
                    montoAUsar = montoUsuario;
                    montoUsuario = 0;
                    await Renta.updateRenta(montoAUsar, renta.IDRenta);
                }
            }

            /* TODO: Implementar render de consultar inquilino */

            // Esto es temporal
            response.redirect('/usuarios');
        } catch(error) {
            console.log(error);
            response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || ''
        });
        }
    })
    .catch((error) => {
        response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || ''
        });
    });
    
};