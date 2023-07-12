'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('games', [{
      RoomId: 1,
      LastMove: new Date(),
      NumberOfPlayers: 3,
      State: "Pending",
      BoardId: 1,
      Turn: 1,
      CurrentNoPlayers: 1
    },{
      RoomId: 2,
      LastMove: new Date(),
      NumberOfPlayers: 3,
      State: "Pending",
      BoardId: 2,
      Turn: 1,
      CurrentNoPlayers: 2
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('games', null, {});

  }
};
