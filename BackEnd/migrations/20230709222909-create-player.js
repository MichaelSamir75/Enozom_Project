'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Players', {
      GameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Games',
          key: 'RoomId',
        },
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'UserId',
        },
      },
      Position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      TurnOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Colour:{
        type:Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Players');
  }
};
