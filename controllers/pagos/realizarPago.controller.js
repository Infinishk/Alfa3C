const Renta = require('../../models/renta.model');
const Cliente = require('../../models/cliente.model');

// Configuras a moment con el locale. 
const moment = require('moment-timezone');
moment.locale('es-mx');

const Openpay = require('openpay');

// Inicializar la instancia de OpenPay
const openpayInstance = new Openpay('48204070', 'sk_c02b7cf0c33d4e24a4e289b0e195890c', false);

exports.fetchRealizarPago= async (request, response, next) => {

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
            
            response.render('pagos/realizarPago', {
                csrfToken: request.csrfToken(),
                cliente: cliente,
                renta: primerRentaNoPagada,
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

exports.realizarPago = async (request, response, next) => {
    const { token, monto, motivo } = request.body; // Obtener el token y monto del request
    const orderId = `ORD-${new Date().getTime()}-${Math.random().toString(36).substring(2, 15)}`;
    const deviceSessionId = openpay.deviceData.setup('48204070');

    try {
        // Crear el cargo en OpenPay
        const charge = await new Promise((resolve, reject) => {
            openpayInstance.charges.create({
                method: 'card',
                source_id: token,
                amount: parseFloat(monto),
                currency: 'MXN',
                description: motivo,
                order_id: orderId, // ID único de la orden
                device_session_id: deviceSessionId, // ID de la sesión del dispositivo
            }, (error, charge) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(charge);
                }
            });
        });

        // Si el pago se realizó correctamente, responder al cliente
        response.status(200).json({
            success: true,
            charge: charge
        });
        
    } catch (error) {
        // En caso de error, manejarlo adecuadamente
        response.status(500).json({
            success: false,
            message: 'Hubo un error al procesar el pago',
            error: error.description || error.message
        });
    }
};


