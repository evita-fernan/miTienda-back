const S = require("sequelize")
const db = require("../config/db")

class ProductInventory extends S.Model{}

ProductInventory.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    quantity: {
        type: S.INTEGER,
        allowNull: false,
    }
}, {sequelize: db, modelName: "productInventory"})

module.exports = ProductInventory