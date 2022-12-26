"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("OrderDetails", [
      {
        productName: "Arabia",
        quantity: 1,
        price: 500,
        userId: 1,
        productId: 1,
      },
      {
        productName: "Hexlo",
        quantity: 1,
        price: 700,
        userId: 2,
        productId: 10,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("OrderDetails", null, {});
  },
};
