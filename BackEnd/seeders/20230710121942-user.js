'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('users', [{
        UserId: 1,
        Username: "john",
        Password: "1234"
      },{
        UserId: 2,
        Username: "jane",
        Password: "1234",
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
