const S = require("sequelize")
const db = require("../config/db")

class ShoppingCart extends S.Model{}

ShoppingCart.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    quantity:{
        type: S.INTEGER,
        allowNull: false,
    }, 
    subtotal:{
        type: S.INTEGER,
        allowNull: false,
    }
}, {sequelize: db, modelName: "shoppingCart"})

module.exports = ShoppingCart