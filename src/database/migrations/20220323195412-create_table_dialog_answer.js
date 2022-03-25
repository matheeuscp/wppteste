'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dialog_answer', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      bot_dialog_id: Sequelize.INTEGER,
      response: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('dialog_answer');
  }
};
