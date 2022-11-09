const S = require("sequelize")
const db = require("../config/db")

class OrderDetail extends S.Model{}

OrderDetail.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    orderDate:{
        type: S.DATE,
        allowNull: false,
    },
    total:{
        type: S.INTEGER,
        allowNull: false,
    }
}, {sequelize: db, modelName: "orderDetail"})

module.exports = OrderDetail