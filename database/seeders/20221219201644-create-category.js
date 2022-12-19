"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Categories", [
      { name: "calcareos" },
      { name: "cerámicos" },
      { name: "artesanales" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Categories", null, {});
  },
};
