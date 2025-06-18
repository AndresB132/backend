module.exports = (sequelize, DataTypes) => {
  const Rutina = sequelize.define('rutinas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    modulo: DataTypes.STRING,
    frecuencia_semanal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repeticiones: DataTypes.INTEGER,
    duracion_segundos: DataTypes.INTEGER,
    fuerza_objetivo: DataTypes.FLOAT,
    progresion_automatica: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fecha_fin: DataTypes.DATE
  }, {
    tableName: 'rutinas',
    timestamps: true // Usa created_at y updated_at automáticos
  });

  Rutina.associate = (models) => {
    Rutina.belongsTo(models.usuarios, {
      foreignKey: 'id_fisio',
      as: 'fisioterapeuta'
    });
    Rutina.belongsTo(models.pacientes, {
      foreignKey: 'id_paciente',
      as: 'paciente'
    });
  };

  return Rutina;
};