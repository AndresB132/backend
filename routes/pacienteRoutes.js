const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.obtenerPacientes);
router.get('/:id', pacienteController.obtenerPacientePorId);
router.post('/', pacienteController.crearPaciente);

module.exports = router;