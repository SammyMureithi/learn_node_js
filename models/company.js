'use strict';
const {
  Model,
  UUID
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Company.hasMany
    }
  }
  Company.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies'
  });
  //generate uuid before creating a new record
  Company.beforeCreate((company, options) => {
    company.id = uuidv4();
  });
  return Company;
};