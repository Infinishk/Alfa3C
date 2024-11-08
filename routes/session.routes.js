const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session/iniciarSesion.controller');
const contrasenaController = require('../controllers/session/restablecerContrasena.controller');
const cerrarSesionController = require('../controllers/session/cerrarSesion.controller');

const getHome = require('../util/home');

router.get('/login', sessionController.getLogin);
router.post('/login', sessionController.postLogin);

router.get('/logout', cerrarSesionController.getLogout);

router.get('/home', getHome);

router.get('/set_password', contrasenaController.getSetPassword);
router.post('/set_password', contrasenaController.postSetPassword);


module.exports = router;