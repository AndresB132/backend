module.exports = (sequelize, DataTypes) => {
  const Mensaje = sequelize.define('mensajes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    leido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fecha_envio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    // Llaves foráneas
    id_emisor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_receptor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    }
  }, {
    tableName: 'mensajes',
    timestamps: false // ya que defines fecha_envio manualmente
  });

  Mensaje.associate = (models) => {
    Mensaje.belongsTo(models.usuarios, {
      foreignKey: 'id_emisor',
      as: 'emisor'
    });
    Mensaje.belongsTo(models.usuarios, {
      foreignKey: 'id_receptor',
      as: 'receptor'
    });
  };

  return Mensaje;
};