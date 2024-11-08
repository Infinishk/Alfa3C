const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const fetchRegistrarPagoManualController = require('../controllers/pagos/fetchRegistrarPagoManual.controller');
router.post('/fetchRegistrarPagoManual', fetchRegistrarPagoManualController.fetchRegistrarPagoManual);

const postRegistrarPagoManualController = require('../controllers/pagos/postRegistrarPagoManual.controller');
router.post('/registrarPagoManual', postRegistrarPagoManualController.postRegistrarPagoManual);

const fetchRealizarPagoController = require('../controllers/pagos/realizarPago.controller');
router.post('/fetchRealizarPago', fetchRealizarPagoController.fetchRealizarPago);

const realizarPagoController = require('../controllers/pagos/realizarPago.controller');
router.post('/realizarPago', realizarPagoController.realizarPago);

module.exports = router;