const { rutinas } = require('../models');

exports.crearRutina = async (req, res) => {
  try {
    // Eliminamos el ID si viene en el body para que la BD lo genere automáticamente
    const { id, ...datosRutina } = req.body;
    const nuevaRutina = await rutinas.create(datosRutina);
    res.status(201).json(nuevaRutina);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Asegúrate de no enviar un ID manualmente y que todos los campos requeridos estén presentes"
    });
  }
};

exports.obtenerRutinas = async (req, res) => {
  try {
    const rutinasLista = await rutinas.findAll({
      order: [['id', 'ASC']]  // Ordenamos por ID ascendente
    });
    res.json(rutinasLista);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      suggestion: "Verifica la conexión con la base de datos y la estructura de la tabla rutinas"
    });
  }
};

// Método adicional para obtener rutina por ID (si lo necesitas)
exports.obtenerRutinaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const idRutina = parseInt(id);
    if (isNaN(idRutina)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const rutina = await rutinas.findByPk(idRutina);
    if (!rutina) {
      return res.status(404).json({ message: "Rutina no encontrada" });
    }
    res.json(rutina);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      action: "Verifica que el parámetro ID sea correcto"
    });
  }
};