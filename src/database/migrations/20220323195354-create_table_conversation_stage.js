'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversation_stage', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      conversation_id: Sequelize.INTEGER,
      dialog_id: Sequelize.INTEGER,
      start_at: Sequelize.DATE,
      end_at: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('conversation_stage');
  }
};
