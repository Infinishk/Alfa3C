const express = require('express');
const router = express.Router();
const checkPermission = require('../util/permisos');
const isAuth = require('../util/is-auth');

const registrarUsuarioController = require('../controllers/usuarios/registrarUsuario.controller');

router.get('/registrarUsuario', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.getRegistrarUsuario);
router.post('/registrarUsuario', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.postRegistrarUsuario);
router.post('/validateNombre', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateNombre);
router.post('/validateApellidos', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateApellidos);
router.post('/validateCorreoElectronico', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateCorreoElectronico);
router.post('/validatePorcentajeInteres', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validatePorcentajeInteres);
router.post('/validateTelefono', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.validateTelefono);



router.get('/registrarAdmin', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.getRegistrarAdmin);
router.post('/registrarAdmin', isAuth, checkPermission('Registrar Usuario'), registrarUsuarioController.postRegistrarAdmin);

module.exports = router;
