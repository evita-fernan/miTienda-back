const S = require("sequelize");
const db = require("../config/db");

class Product extends S.Model {}

Product.init(
  {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo",
        },
      },
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El precio no puede ser nulo",
        },
      },
    },
    img: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La imagen no puede ser nula",
        },
      },
    },
    description: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La descripción no puede ser nula",
        },
      },
    },
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
