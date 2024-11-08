const express = require('express');
const router = express.Router();
const checkPermission = require('../util/permisos');

const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');

// Registration routes
router.get('/registrarUsuario', checkPermission('Registrar Usuario'), registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', checkPermission('Registrar Usuario'), registrarUsuarioController.postRegistrarUsuario);

router.get('/registrarAdmin', registrarUsuarioController.getRegistrarAdmin);
router.post('/registrarAdmin', registrarUsuarioController.postRegistrarAdmin);

module.exports = router;
