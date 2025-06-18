const { usuarios } = require('../models');

const PROTECTED_FIELDS = ['contraseña'];

// ✅ Listar todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await usuarios.findAll();
    const usuariosLimpios = listaUsuarios.map(usuario => {
      const datos = usuario.toJSON();
      PROTECTED_FIELDS.forEach(campo => delete datos[campo]);
      return datos;
    });

    res.json({
      exito: true,
      data: usuariosLimpios
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: "Error al obtener usuarios",
      detalles: error.message
    });
  }
};

// ✅ Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        exito: false,
        error: "Usuario no encontrado"
      });
    }

    const usuarioLimpio = usuario.toJSON();
    PROTECTED_FIELDS.forEach(campo => delete usuarioLimpio[campo]);

    res.json({
      exito: true,
      data: usuarioLimpio
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: "Error al obtener el usuario",
      detalles: error.message
    });
  }
};

// ✅ Crear nuevo usuario (el que ya tenías)
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    if (!nombre || !correo || !contraseña || !rol) {
      return res.status(400).json({
        exito: false,
        error: "Faltan campos requeridos",
        campos_faltantes: ['nombre', 'correo', 'contraseña', 'rol'].filter(campo => !req.body[campo])
      });
    }

    const nuevoUsuario = await usuarios.create({ nombre, correo, contraseña, rol });

    const usuarioResponse = Object.keys(nuevoUsuario.toJSON()).reduce((acc, key) => {
      if (!PROTECTED_FIELDS.includes(key)) {
        acc[key] = nuevoUsuario[key];
      }
      return acc;
    }, {});

    res.status(201).json({
      exito: true,
      data: usuarioResponse,
      message: "Usuario creado exitosamente"
    });

  } catch (error) {
    res.status(500).json({
      exito: false,
      error: "Error al crear usuario",
      detalles: error.message,
      systemMessage: error.original?.message || error.parent?.detail || null
    });
  }
};
