const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController');

router.get('/', sesionController.obtenerSesiones);
router.post('/', sesionController.crearSesion);

module.exports = router;