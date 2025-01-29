'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Drones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here (e.g., belongsTo, hasMany)
    }
  }

  Drones.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serial_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        defaultValue: 'IDLE',
        allowNull: false,
      },
      max_weight: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      battery: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Drones',
      tableName: 'Drones',
      timestamps: true,
    }
  );


  return Drones;
};
