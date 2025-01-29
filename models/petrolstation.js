'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetrolStation extends Model {

    static associate(models) {
      // PetrolStation.belongsTo(models.Company, { foreignKey: company_id });
    }
  }
  PetrolStation.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: 13
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    company_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PetrolStation',
    tableName: 'petrol_station'
  });
  return PetrolStation;
};