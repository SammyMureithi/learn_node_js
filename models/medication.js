'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Medication.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    weight: DataTypes.NUMERIC,
    created_at: DataTypes.TIME,
    updated_at: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Medication',
    tableName: 'Medications'
  });
  return Medication;
};