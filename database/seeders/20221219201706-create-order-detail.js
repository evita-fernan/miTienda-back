"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("OrderDetails", [
      {
        quantity: 1,
        userId: 1,
        productId: 1,
      },
      {
        quantity: 1,
        userId: 2,
        productId: 10,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
