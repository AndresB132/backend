exports.usuarioCreateDTO = (req, res, next) => {
  const { nombre, correo, contraseña, rol } = req.body;

  // 1. Validación de campos obligatorios
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

  // 2. Validación de formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      exito: false,
      error: 'Formato de correo inválido',
      recibido: correo,
      formato_esperado: "usuario@dominio.ext"
    });
  }

  // 3. Validación de fortaleza de contraseña
  if (contraseña.length < 8) {
    return res.status(400).json({
      exito: false,
      error: 'La contraseña debe tener al menos 8 caracteres',
      minimo: 8,
      recibido: contraseña.length
    });
  }

  // 4. Validación de rol
  const rolesPermitidos = ['fisio', 'paciente'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({
      exito: false,
      error: 'Rol no permitido',
      detalles: {
        roles_permitidos: rolesPermitidos,
        valor_recibido: rol,
        sugerencia: rolesPermitidos.map(r => `"${r}"`).join(' o ')
      }
    });
  }

  // 5. Validación opcional del nombre
  if (nombre.length < 3) {
    return res.status(400).json({
      exito: false,
      error: 'El nombre debe tener al menos 3 caracteres',
      minimo: 3,
      recibido: nombre.length
    });
  }

  // Si pasa todas las validaciones
  next();
};