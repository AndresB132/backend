// controllers/pacientesController.js

const { pacientes } = require('../models');

exports.crearPaciente = async (req, res) => {
  try {
    // Elimina el ID si viene en el body (la BD lo generará automáticamente)
    const { id, ...datosPaciente } = req.body;
    const nuevoPaciente = await pacientes.create(datosPaciente);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPacientes = async (req, res) => {
  try {
    const lista = await pacientes.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPacientePorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Convertimos el ID a número (por si viene como string)
    const idPaciente = parseInt(id);
    if (isNaN(idPaciente)) {
      return res.status(400).json({ error: "ID inválido: debe ser numérico" });
    }

    const paciente = await pacientes.findOne({ 
      where: { 
        id: idPaciente  // Buscamos por el campo 'id' (no id_usuario)
      } 
    });
    
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};