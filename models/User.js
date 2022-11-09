const S = require("sequelize");
const db = require("../config/db");

class User extends S.Model {}

User.init(
  {
    id: {
      type: S.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fName: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre no puede ser nulo",
        },
      },
    },
    lName: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El apellido no puede ser nulo",
        },
      },
    },
    fullName: {
      type: S.VIRTUAL,
      get() {
        return `${this.fName} ${this.lName}`;
      },
      set(value) {
        throw new Error("No se puede modificar el nombre completo");
      },
    },
    dni: {
      type: S.INTEGER,
      allowNull: false,
      unique: {
        args: true,
        msg: "El DNI ya existe",
      },
      validate: {
        notNull: {
          msg: "El dni no puede ser nulo",
        },
      },
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "El email ya existe",
      },
      validate: {
        notNull: {
          msg: "El email no puede ser nulo",
        },
        isEmail: true,
      },
    },
    phone: {
      type: S.STRING,
      allowNull: true
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La contraseña no puede ser nula",
        },
      },
    },
    role: {
      type: S.STRING,
      defaultValue: "user"
    },
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;
