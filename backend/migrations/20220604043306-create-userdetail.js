'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      phone: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('userdetails');
  }
};