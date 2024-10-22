const Renta = require('../../models/renta.model');
const Cliente = require('../../models/cliente.model');

// Configuras a moment con el locale. 
const moment = require('moment-timezone');
moment.locale('es-mx');

exports.fetchRegistrarPagoManual = async (request, response, next) => {

    const matches =  request.body.buscar.match(/(.+)\s\|\s([A-Z0-9]+)/);

    Cliente.fetchClienteRFC(matches[2])
    .then(([clienteResponse, fieldData]) => {

        const cliente = clienteResponse[0];

        Renta.fetchPrimerRentaNoPagada(cliente.IDCliente)
        .then(([primerRentaNoPagada, fieldData]) => {

            if (primerRentaNoPagada.length != 0) {

                // Conviertes la fecha
                for (let count = 0; count < primerRentaNoPagada.length; count++) {
                    primerRentaNoPagada[count].FechaLimite = moment(new Date(primerRentaNoPagada[count].FechaLimite)).format('LL');
                }
            }
            
            response.render('pagos/registrarPagoManual', {
                csrfToken: request.csrfToken(),
                cliente: cliente,
                renta: primerRentaNoPagada[0],
                username: request.session.username || '',
                permisos: request.session.permisos || [],
                rol: request.session.rol || ''
            });
        })
        .catch((error) => {
            response.status(500).render('500', {
                username: request.session.username || '',
                permisos: request.session.permisos || [],
                rol: request.session.rol || ''
            });
        });
    })
    .catch((error) => {
        response.status(500).render('500', {
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || ''
        });
    });

};