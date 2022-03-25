'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: Sequelize.INTEGER,
      chat_id: Sequelize.STRING,
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('conversations');
  }
};
