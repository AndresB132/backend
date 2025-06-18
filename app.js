const express = require('express');
const cors = require('cors');
const models = require('./models');

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const rutinaRoutes = require('./routes/rutinaRoutes');
const sesionRoutes = require('./routes/sesionRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/rutinas', rutinaRoutes);
app.use('/api/sesiones', sesionRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api', authRoutes);

// Sincronización de modelos
const syncDatabase = async () => {
  try {
    await models.sequelize.sync({ force: false });
    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error al sincronizar tablas:', error);
  }
};

syncDatabase();

module.exports = app;