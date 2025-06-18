const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Genera un token JWT para un payload dado
 * @param {Object} payload - Datos a incluir en el token (ej: id, correo, rol)
 * @returns {string} - Token firmado
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};