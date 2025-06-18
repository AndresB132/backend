exports.usuarioCreateDTO = (req, res, next) => {
  const { nombre, correo, contraseña, rol } = req.body;

  const camposRequeridos = { nombre, correo, contraseña, rol };
  const camposFaltantes = Object.entries(camposRequeridos)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      exito: false,
      error: 'Campos obligatorios faltantes',
      detalles: {
        campos_faltantes: camposFaltantes,
        estructura_ejemplo: {
          nombre: "string (mín. 3 caracteres)",
          correo: "string (formato email válido)",
          contraseña: "string (mín. 8 caracteres)",
          rol: "enum ['fisio', 'paciente']"
        }
      }
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      exito: false,
      error: 'Formato de correo inválido'
    });
  }

  if (contraseña.length < 8) {
    return res.status(400).json({
      exito: false,
      error: 'La contraseña debe tener al menos 8 caracteres'
    });
  }

  const rolesPermitidos = ['fisio', 'paciente'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({
      exito: false,
      error: 'Rol no permitido',
      roles_permitidos: rolesPermitidos
    });
  }

  if (nombre.length < 3) {
    return res.status(400).json({
      exito: false,
      error: 'El nombre debe tener al menos 3 caracteres'
    });
  }

  next();
};
