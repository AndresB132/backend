const { sesiones } = require('../models');

exports.crearSesion = async (req, res) => {
  try {
    // Eliminamos el ID si viene en el request
    const { id, ...datosSesion } = req.body;
    
    // Validación básica de campos requeridos (ajusta según tu modelo)
    if (!datosSesion.fecha || !datosSesion.id_paciente) {
      return res.status(400).json({ 
        error: "Campos requeridos: fecha y id_paciente" 
      });
    }

    const nuevaSesion = await sesiones.create(datosSesion);
    res.status(201).json({
      success: true,
      data: nuevaSesion,
      message: "Sesión creada exitosamente"
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al crear sesión",
      details: error.message,
      suggestion: "Verifica los datos enviados y la conexión con la base de datos"
    });
  }
};

exports.obtenerSesiones = async (req, res) => {
  try {
    const sesionesLista = await sesiones.findAll({
      order: [['id', 'DESC']],  // Orden descendente por ID
      attributes: { exclude: ['createdAt', 'updatedAt'] }  // Excluir campos si es necesario
    });
    
    res.json({
      success: true,
      count: sesionesLista.length,
      data: sesionesLista
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al obtener sesiones",
      details: error.message,
      action: "Verifica la conexión con la base de datos"
    });
  }
};

// Nuevo método para obtener sesión por ID
exports.obtenerSesionPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        error: "ID inválido",
        details: "El ID debe ser un número entero"
      });
    }

    const sesion = await sesiones.findByPk(id);
    
    if (!sesion) {
      return res.status(404).json({ 
        error: "No encontrado",
        message: `No existe sesión con ID ${id}`
      });
    }

    res.json({
      success: true,
      data: sesion
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al obtener sesión",
      details: error.message
    });
  }
};