module.exports = (sequelize, DataTypes) => {
  const Sesion = sequelize.define('sesiones', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    modulo_usado: DataTypes.STRING,
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    tiempo_realizado: DataTypes.INTEGER,
    repeticiones_completadas: DataTypes.INTEGER,
    fuerza_promedio: DataTypes.FLOAT,
    dolor_antes: DataTypes.INTEGER,
    dolor_despues: DataTypes.INTEGER,
    comentario: DataTypes.TEXT
  }, {
    tableName: 'sesiones',
    timestamps: false // ya que usas `fecha`
  });

  Sesion.associate = (models) => {
    Sesion.belongsTo(models.pacientes, {
      foreignKey: 'id_paciente',
      as: 'paciente'
    });
  };

  return Sesion;
};