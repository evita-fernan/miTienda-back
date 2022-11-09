const S = require("sequelize")
const db = require("../config/db")

class UserAddress extends S.Model{}

UserAddress.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city: {
        type: S.STRING,
        allowNull: true,
    },
    state:{
        type: S.STRING,
        allowNull: true,
    },
    street:{
        type: S.STRING,
        allowNull: true,
    },
    number:{
        type: S.INTEGER,
        allowNull: true,
    },
    zip:{
        type: S.INTEGER,
        allowNull: true,
    }
}, {sequelize: db, modelName: "userAddress"})

module.exports = UserAddress


