const express = require('express');
const router = express.Router();
const checkPermission = require('../util/permisos');
const isAuth = require('../util/is-auth');

const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');

router.get('/registrarUsuario', registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', registrarUsuarioController.postRegistrarUsuario);
router.get('/registrarAdmin', registrarUsuarioController.getRegistrarAdmin);
router.post('/registrarAdmin', registrarUsuarioController.postRegistrarAdmin);
router.post('/validateNombre', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateNombre);
router.post('/validateApellidos', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateApellidos);
router.post('/validateCorreoElectronico', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateCorreoElectronico);
router.post('/validatePorcentajeInteres', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validatePorcentajeInteres);
router.post('/validateTelefono', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateTelefono);





module.exports = router;
