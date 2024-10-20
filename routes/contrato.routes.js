const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();
const consultarContratosController = require('../controllers/contrato/consultarContratos.controller');
const desactivarContratoController = require('../controllers/contrato/desactivarContrato.controller');
const detallesContratoController = require('../controllers/contrato/detallesContrato.controller');
const agregarContratoController = require('../controllers/contrato/agregarContrato.controller');
const modificarContratoController = require('../controllers/contrato/modificarContrato.controller');

router.get('/', consultarContratosController.fetch_contratos)
router.post('/modificarEstatus', desactivarContratoController.post_modificar_estatus)
router.post('/detallesContrato', detallesContratoController.post_detalles_contrato)
router.get('/registrarContrato', agregarContratoController.get_registrar_contrato);
router.post('/registrarContrato', agregarContratoController.post_registrar_contrato);
router.post('/fetchContrato', modificarContratoController.post_fetch_contrato);
router.post('/modificarContrato', modificarContratoController.post_modificar_contrato);


module.exports = router;