const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const consultarContratosController = require('../controllers/contrato/consultarContratos.controller');
const desactivarContratoController = require('../controllers/contrato/desactivarContrato.controller')

router.get('/', consultarContratosController.fetch_contratos)
router.post('/modificar_estatus', desactivarContratoController.post_modificar_estatus)

module.exports = router;