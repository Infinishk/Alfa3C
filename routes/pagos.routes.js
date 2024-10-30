const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const fetchRegistrarPagoManualController = require('../controllers/pagos/fetchRegistrarPagoManual.controller');
router.post('/fetchRegistrarPagoManual', fetchRegistrarPagoManualController.fetchRegistrarPagoManual);

const postRegistrarPagoManualController = require('../controllers/pagos/postRegistrarPagoManual.controller');
router.post('/registrarPagoManual', postRegistrarPagoManualController.postRegistrarPagoManual);

module.exports = router;