const express = require('express');

// Ahora en vez de usar app, se usa el router de express
const router = express.Router();

const modifyUserStatusController = require('../controllers/usuarios/modifyUserStatus.controller');
router.post('/modifyUserStatus', modifyUserStatusController.postModifyUserStatus);

const consultarUsuariosController = require('../controllers/usuarios/consultarUsuario.controller');
router.get('/', consultarUsuariosController.getUsuarios);

module.exports = router;