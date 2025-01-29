'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serial_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'IDLE'
      },
      max_weight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      battery: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Drones');
  }
};
