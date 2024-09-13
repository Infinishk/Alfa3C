const Contrato = require('.../models/contrato.model');

exports.get_registrar_contrato = (request, response, next) => {
    response.render('contrato/registrarDiplomado', {
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        rol: request.session.rol || "",
    });
};

exports.post_registrar_contrato = (request, response, next) => {
    const razonSocial = request.body.precioDiplomado;
    const inflacion = request.body.Duracion;
    const cliente = request.body.nombreDiplomado;
    const fechaInicio = request.body.fechaInicio;
    const fechaFin = request.body.fechaFin;
    const costoTotal = request.body.costoTotal;
    Contrato.save(razonSocial, inflacion, cliente, fechaInicio, fechaFin, costoTotal)
        .then(() => {
            response.redirect('/contrato');
        }).catch(err => console.log(err));
}