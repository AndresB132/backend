const { OAuth2Client } = require('google-auth-library');
const { usuarios } = require('../models');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginConGoogle = async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) {
    return res.status(400).json({ success: false, error: 'Token de Google faltante' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const correo = payload.email;
    const nombre = payload.name;

    let usuario = await usuarios.findOne({ where: { correo } });

    if (!usuario) {
      usuario = await usuarios.create({
        nombre,
        correo,
        contraseña: 'google', // Marca que vino de Google
        rol: 'paciente'        // O establece un rol por defecto
      });
    }

    const token = jwt.sign(
      { sub: usuario.id, role: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Error verificando token de Google', detalles: error.message });
  }
};
