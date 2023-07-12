'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('players', [{
      GameId: 1,
      UserId: 1,
      Position: 1,
      TurnOrder: 1
    },{
      GameId: 1,
      UserId: 2,
      Position: 1,
      TurnOrder: 1
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});

  }
};
