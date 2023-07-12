'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('players', [{
      GameId: 1,
      UserId: 1,
      Position: 1,
      TurnOrder: 1,
      Colour: "Red"
    },{
      GameId: 1,
      UserId: 2,
      Position: 1,
      TurnOrder: 1,
      Colour: "Blue"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});

  }
};
