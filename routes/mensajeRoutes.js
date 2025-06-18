const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/:id_usuario', mensajeController.obtenerMensajes);
router.post('/', mensajeController.enviarMensaje);

module.exports = router;