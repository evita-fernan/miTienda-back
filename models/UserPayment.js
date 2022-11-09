const S = require("sequelize")
const db = require("../config/db")

class UserPayment extends S.Model{}

UserPayment.init({
    id:{
        type: S.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    paymentType:{
        type: S.STRING,
        allowNull: false,
        validate: {
            isIn: {
              args: [["tarjeta de debito", "tarjeta de credito"]],
              msg: "Se puede pagar con tarjeta de crédito o tarjeta de débito",
            },
          },
    },
    provider:{
        type: S.STRING,
        allowNull: false,
    },
    accountNumber:{
        type: S.INTEGER,
        allowNull: false,
    },
    expiry:{
        type: S.DATE,
        allowNull: false,
    }

}, {sequelize: db, modelName: "userPayment"})

module.exports = UserPayment