"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("UserPayments", [
      {
        paymentType: "debit card",
        provider: "visa",
        accountNumber: "4949878745456006",
        expiry: "2025-12-25",
        userId: 1,
      },
      {
        paymentType: "credit card",
        provider: "visa",
        accountNumber: "4949878745456006",
        expiry: "2025-12-25",
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("UserPayments", null, {});
  },
};
