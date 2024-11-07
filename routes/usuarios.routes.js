const express = require('express');
const router = express.Router();
const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');

// Registration routes
router.get('/registrarUsuario', registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', registrarUsuarioController.postRegistrarUsuario);

router.get('/registrarAdmin', registrarUsuarioController.getRegistrarAdmin);
router.post('/registrarAdmin', registrarUsuarioController.postRegistrarAdmin);

module.exports = router;
