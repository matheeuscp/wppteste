'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bot_dialogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      bot_id: Sequelize.INTEGER,
      message_bot: Sequelize.STRING,
      type_message: {
        type: Sequelize.ENUM('T', 'I', 'A'),
        defaultValue: 'T'
      },
      media: Sequelize.STRING,
      response_options: Sequelize.STRING,
      sequence: Sequelize.INTEGER,
      attempts: Sequelize.INTEGER,
      action: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('bot_dialogs');
  }
};
