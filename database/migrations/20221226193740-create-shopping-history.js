"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ShoppingHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      finalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      userAddressId: { type: Sequelize.INTEGER },
      userPaymentId: { type: Sequelize.INTEGER },
      orderDetailId: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ShoppingHistories");
  },
};
