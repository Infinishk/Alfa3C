const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const consultarContratosController = require('../controllers/contrato/consultarContratos.controller');
const desactivarContratoController = require('../controllers/contrato/desactivarContrato.controller');
const detallesContratoController = require('../controllers/contrato/detallesContrato.controller');

router.get('/', consultarContratosController.fetch_contratos)
router.post('/modificarEstatus', desactivarContratoController.post_modificar_estatus)
router.post('/detallesContrato', detallesContratoController.post_detalles_contrato)

module.exports = router;