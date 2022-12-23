"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingCart.belongsTo(models.User, { foreignKey: "userId" });
      ShoppingCart.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ShoppingCart.init(
    {
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      total: { type: DataTypes.DECIMAL, allowNull: false },
      userId: {type: DataTypes.INTEGER},
      productId: {type: DataTypes.INTEGER},
    },
    {
      sequelize,
      modelName: "ShoppingCart",
      timestamps: true,
    }
  );
  return ShoppingCart;
};
