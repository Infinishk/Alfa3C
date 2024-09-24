const express = require('express');
const router = express.Router();
const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');


router.get('/registrarUsuario', registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', registrarUsuarioController.postRegistrarUsuario);

module.exports = router;
