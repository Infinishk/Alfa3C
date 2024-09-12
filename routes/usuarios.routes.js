const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const consultarUsuariosController = require('../controllers/usuarios/consultarUsuario.controller');
router.get('/', consultarUsuariosController.getUsuarios);

module.exports = router;