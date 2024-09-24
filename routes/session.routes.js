const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

// PLANTILLA: IMPORTAR CONTROLADOR DE FUNCION
// USAR EL GET, POST, PUT CON LA RUTA 

/* EJEMPLO: 
const iniciarSesionController = require('../controllers/session/iniciarSesion.controller');
router.get('/login', sessionController.get_login);
*/
const sessionController = require('../controllers/session/iniciarSesion.controller');
const contrasenaController = require('../controllers/session/restablecerContrasena.controller');

router.get('/login', sessionController.getLogin);
router.post('/login', sessionController.postLogin);
router.get('/reset_password',contrasenaController.get_reset_password);
router.post('/reset_password',contrasenaController.post_reset_password);
router.get('/set_password',contrasenaController.get_set_password);
router.post('/set_password',contrasenaController.post_set_password);

module.exports = router;