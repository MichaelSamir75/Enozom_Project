'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('boards', [{
      BoardId: 1,
      BoardName: "boardI",
      PathToBoard: "x"
    },{
      BoardId: 2,
      BoardName: "boardII",
      PathToBoard: "y"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('boards', null, {});
  }
};
