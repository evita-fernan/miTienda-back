"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderDetail.belongsTo(models.User, { foreignKey: "userId" });
      OrderDetail.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  OrderDetail.init(
    {
      productName: { type: DataTypes.STRING, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER },
      productId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      timestamps: true,
    }
  );
  return OrderDetail;
};
