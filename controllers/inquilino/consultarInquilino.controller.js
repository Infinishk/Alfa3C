const Inquilino = require('../../models/inquilino.model');

exports.fetch_inquilino = async (request, response, next) => {
    try {
        let matches = request.body.buscar.match(/[A-Z]{4}\d{6}[A-Z0-9]{2,3}/i);
        const rfc = matches[0];

        // Datos personales
        let datos = await Inquilino.fetch_datos(rfc);

        const inquilino = datos[0][0];

        // Renta / fichas
        let [rentas] = await Inquilino.fetch_renta(inquilino.IDCliente);

        // Group rentas by IDDetalleContrato
        let rentasPorContrato = {};
        for (const renta of rentas) {
            const contratoID = renta.IDDetalleContrato;
            if (!rentasPorContrato[contratoID]) {
                rentasPorContrato[contratoID] = [];
            }
            rentasPorContrato[contratoID].push(renta);
        }

        // Pagos
        let pagos = [];

        for (const renta of rentas) {
            const [pagosDatos] = await Inquilino.fetch_pagos(renta.IDRenta);
            pagos.push(...pagosDatos);
        }

        // Contratos
        let contratos = await Inquilino.fetch_asignaciones(inquilino.IDCliente);
        
        response.render('inquilino/consultarInquilino', {
            inquilino: inquilino,
            rentasPorContrato: rentasPorContrato,
            pagos: pagos,
            contratos: contratos[0],
            username: request.session.username || '',
            permisos: request.session.permisos || [],
            rol: request.session.rol || "",
            csrfToken: request.csrfToken()
        })
    }
    catch (error) {
        console.log(error);
    }
}