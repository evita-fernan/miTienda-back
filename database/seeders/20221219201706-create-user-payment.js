"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("UserPayments", [
      {
        paymentType: "debit card",
        provider: "visa",
        userId: 1,
      },
      {
        paymentType: "credit card",
        provider: "visa",
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("UserPayments", null, {});
  },
};
