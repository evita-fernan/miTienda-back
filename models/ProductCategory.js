const S = require("sequelize")
const db = require("../config/db")

class ProductCategory extends S.Model{}

ProductCategory.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: S.STRING,
        allowNull: false,
    }
}, {sequelize: db, modelName: "productCategory"})

module.exports = ProductCategory