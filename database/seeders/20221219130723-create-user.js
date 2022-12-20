"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        firstName: "Homero",
        lastName: "Simpson",
        email: "homero@mail.com",
        password: "Hola1234",
        role: "user",
      },
      {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@mail.com",
        password: "Hola1234",
        role: "user",
      },
      {
        firstName: "Moe",
        lastName: "Szyslak",
        email: "moe@mail.com",
        password: "Hola1234",
        role: "admin",
      },
      {
        firstName: "Apu",
        lastName: "Nahasa",
        email: "apu@mail.com",
        password: "Hola1234",
        role: "admin",
      },
    ];

    return await queryInterface.bulkInsert("Users", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
