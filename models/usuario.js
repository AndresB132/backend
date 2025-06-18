module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Validación extra de formato email
      }
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('fisio', 'paciente'),
      allowNull: false
    },
    token_pin: DataTypes.STRING
  }, {
    tableName: 'usuarios',
    timestamps: true
  });

  Usuario.associate = (models) => {
    Usuario.hasOne(models.pacientes, {
      foreignKey: 'id_usuario',
      as: 'paciente'
    });
    Usuario.hasMany(models.rutinas, {
      foreignKey: 'id_fisio',
      as: 'rutinas'
    });
    Usuario.hasMany(models.mensajes, {
      foreignKey: 'id_emisor',
      as: 'mensajes_enviados'
    });
  };

  return Usuario;
};