"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("UserAddresses", [
      {
        city: "Río Grande",
        state: "Tierra del Fuego",
        street: "Av. San Martín",
        number: 55,
        zip: 9420,
        userId: 1,
      },
      {
        city: "Buenos Aires",
        state: "Buenos Aires",
        street: "Av. San Martín",
        number: 60,
        zip: 1000,
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("UserAddresses", null, {});
  },
};
