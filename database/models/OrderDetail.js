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
      OrderDetail.hasMany(models.Product, { foreignKey: "orderDetailId" });
    }
  }
  OrderDetail.init(
    {
      orderDate: { type: DataTypes.DATE, allowNull: false },
      total: { type: DataTypes.DECIMAL, allowNull: false },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      timestamps: true,
    }
  );
  return OrderDetail;
};
