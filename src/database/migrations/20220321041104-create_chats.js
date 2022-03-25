'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      message: Sequelize.STRING,
      keywork: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('messages');
  }
};
