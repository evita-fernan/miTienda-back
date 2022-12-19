"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = [
      {
        firstName: "Homero",
        lastName: "Simpson",
        email: "homero@mail.com",
        password: "Hola1234",
        roleId: 1,
      },
      {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@mail.com",
        password: "Hola1234",
        roleId: 1,
      },
      {
        firstName: "Moe",
        lastName: "Szyslak",
        email: "moe@mail.com",
        password: "Hola1234",
        roleId: 2,
      },
      {
        firstName: "Apu",
        lastName: "Nahasa",
        email: "apu@mail.com",
        password: "Hola1234",
        roleId: 2,
      },
    ];

    return await queryInterface.bulkInsert("Users", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
