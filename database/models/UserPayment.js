"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPayment.belongsTo(models.User, { foreignKey: "userId" });
      UserPayment.hasMany(models.ShoppingHistory), {foreignKey: "userPaymentId"}
    }
  }
  UserPayment.init(
    {
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["debit card", "credit card"]],
          },
        },
      },
      provider: { type: DataTypes.STRING, allowNull: false },
      accountNumber: { type: DataTypes.STRING, allowNull: false },
      expiry: { type: DataTypes.DATE, allowNull: false },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserPayment",
      timestamps: true,
    }
  );
  return UserPayment;
};
