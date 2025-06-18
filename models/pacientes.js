module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('pacientes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genero: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.TEXT,
    historial_clinico: DataTypes.TEXT,
    antecedentes_medicos: DataTypes.TEXT,
    nivel_actividad: DataTypes.STRING,
    calzado_habitual: DataTypes.STRING,
    zonas_dolor: DataTypes.ARRAY(DataTypes.STRING),
    horarios_dolor: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    tableName: 'pacientes',
    timestamps: false
  });

  Paciente.associate = (models) => {
    Paciente.belongsTo(models.usuarios, {
      foreignKey: 'id_usuario', // este sigue siendo UUID en usuarios?
      as: 'usuario'
    });

    Paciente.hasMany(models.sesiones, {
      foreignKey: 'id_paciente',
      as: 'sesiones'
    });

    Paciente.hasMany(models.rutinas, {
      foreignKey: 'id_paciente',
      as: 'rutinas_asignadas'
    });
  };

  return Paciente;
};