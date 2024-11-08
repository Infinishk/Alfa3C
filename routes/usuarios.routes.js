const express = require('express');
const router = express.Router();
const checkPermission = require('../util/permisos');
const isAuth = require('../util/is-auth');

const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');

// Registration routes
router.get('/registrarUsuario', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.postRegistrarUsuario);

router.get('/registrarAdmin', isAuth, registrarUsuarioController.getRegistrarAdmin);
router.post('/registrarAdmin', isAuth, registrarUsuarioController.postRegistrarAdmin);

module.exports = router;
