const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

// PLANTILLA: IMPORTAR CONTROLADOR DE FUNCION
// USAR EL GET, POST, PUT CON LA RUTA 

/* EJEMPLO: 
const iniciarSesionController = require('../controllers/session/iniciarSesion.controller');
router.get('/login', sessionController.get_login);
*/

const contrasenaController = require('../controllers/configuracion/updateContrasena.controller');

router.get('/update_password', contrasenaController.get_update_password);
router.post('/verify_password', contrasenaController.post_verify_password);
router.post('/update_password', contrasenaController.post_modificar_contrasena);

module.exports = router;