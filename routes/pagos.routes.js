const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const registrarPagoManualController = require('../controllers/pagos/registrarPagoManual.controller');
router.post('/fetchRegistrarPagoManual', registrarPagoManualController.fetchRegistrarPagoManual);

module.exports = router;