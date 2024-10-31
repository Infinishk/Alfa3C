const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const buscarInquilinoController = require('../controllers/inquilino/buscarInquilino.controller');

router.get('/buscarInquilino', buscarInquilinoController.get_buscar);
router.get('/buscarInquilino/autocomplete/:valor_busqueda', buscarInquilinoController.get_autocomplete);
router.get('/buscarInquilino/autocomplete/', buscarInquilinoController.get_autocomplete);

module.exports = router;