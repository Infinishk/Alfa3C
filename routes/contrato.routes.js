const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

// PLANTILLA: IMPORTAR CONTROLADOR DE FUNCION
// USAR EL GET, POST, PUT CON LA RUTA 

/* EJEMPLO: 
const iniciarSesionController = require('../controllers/session/iniciarSesion.controller');
router.get('/login', sessionController.get_login);
*/

const modificarContratoController = require('../controllers/contrato/modificarContrato.controller');
router.get('/modificarContrato', modificarContratoController.get_modificar_contrato);
router.post('/modificarContrato', modificarContratoController.post_modificar_contrato);

module.exports = router;