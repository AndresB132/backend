const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { usuarioCreateDTO } = require('../dto/usuarioDTO');

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/', usuarioCreateDTO, usuarioController.crearUsuario);

module.exports = router;
