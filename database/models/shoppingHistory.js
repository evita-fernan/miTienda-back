"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingHistory.belongsTo(models.User, { foreignKey: "userId" });
      ShoppingHistory.belongsTo(models.UserAddress, {
        foreignKey: "userAddressId",
      });
      ShoppingHistory.belongsTo(models.UserPayment, {
        foreignKey: "userPaymentId",
      });
      ShoppingHistory.belongsTo(models.OrderDetail, {
        foreignKey: "orderDetailId",
      });
    }
  }
  ShoppingHistory.init(
    {
      finalPrice: { type: DataTypes.DECIMAL, allowNull: false },
      userId: { type: DataTypes.INTEGER },
      userAddressId: { type: DataTypes.INTEGER },
      userPaymentId: { type: DataTypes.INTEGER },
      orderDetailId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "ShoppingHistory",
    }
  );
  return ShoppingHistory;
};
