'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('elements', [{
      Index: 1,
      BoardId:1,
      From: 3,
      To: 17
    },{
      Index: 2,
      BoardId:1,
      From: 5,
      To: 24
    },{
      Index: 3,
      BoardId:1,
      From: 30,
      To: 70
    },{
      Index: 4,
      BoardId:1,
      From: 71,
      To: 11
    },{
      Index: 5,
      BoardId:1,
      From: 57,
      To: 20
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('elements', null, {});

  }
};
