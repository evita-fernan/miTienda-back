const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
require("dotenv").config();

module.exports = {
  //Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({ include: UserAddress });
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener un usuario especifico
  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, { include: UserAddress });
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Registrar la dirección de un usuario
  registerAddress: async (req, res) => {
    const { city, state, street, number, zip } = req.body;
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      const userAddress = await UserAddress.create({
        city,
        state,
        street,
        number,
        zip,
      });
      res.status(200).json(userAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Editar la dirección de un usuario
  editAddress: async (req, res) => {
    const { city, state, street, number, zip } = req.body;
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      const userAddress = await UserAddress.update(
        {
          city,
          state,
          street,
          number,
          zip,
        },
        { where: { id: id } }
      );
      res.status(200).json({ msg: "Datos actualizados exitosamente" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener la dirección de un usuario
  getAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }
      const userAddress = await UserAddress.findByPk(id, {
        include: User,
      });
      res.status(200).json(userAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllAddress: async (req, res) => {
    try {
      const userAddress = await UserAddress.findAll({ include: User });
      res.status(200).json(userAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
