const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

router.get('/', rutinaController.obtenerRutinas);
router.post('/', rutinaController.crearRutina);

module.exports = router;