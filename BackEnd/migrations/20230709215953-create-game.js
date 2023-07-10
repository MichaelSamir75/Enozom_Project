'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Games', {
      RoomId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      LastMove: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      NumberOfPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      State: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      BoardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Boards',
          key: 'BoardId',
        },
      },
      Turn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CurrentNoPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Games');
  }
};
