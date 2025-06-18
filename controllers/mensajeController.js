const { mensajes } = require('../models');

// Enviar mensaje (sin UUID)
exports.enviarMensaje = async (req, res) => {
  try {
    // Asegúrate de que req.body NO incluya un ID
    const { contenido, id_emisor, id_receptor } = req.body;
    const mensaje = await mensajes.create({
      contenido,  // Campo de texto del mensaje
      id_emisor,  // ID numérico del emisor
      id_receptor // ID numérico del receptor
    });
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener mensajes (IDs numéricos)
exports.obtenerMensajes = async (req, res) => {
  try {
    const mensajesLista = await mensajes.findAll({
      where: {
        id_emisor: parseInt(req.params.id_usuario),  // Convertir a número
        id_receptor: parseInt(req.query.con)         // Convertir a número
      }
    });
    res.json(mensajesLista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};