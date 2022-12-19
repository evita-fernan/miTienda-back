"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAddress.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserAddress.init(
    {
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      zip: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserAddress",
      timestamps: true,
    }
  );
  return UserAddress;
};
