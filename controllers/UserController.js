const { User } = require("../database/models");
const { UserAddress } = require("../database/models");
require("dotenv").config();

module.exports = {
  //Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({ include: UserAddress });
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
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Registrar la dirección de un usuario
  registerAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const userAddress = await UserAddress.create(req.body, { include: User });
      res.status(201).json(userAddress);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Editar la dirección de un usuario
  editAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const userAddress = await UserAddress.update(req.body, {
        where: { id: id },
      });
      res.status(200).json({ msg: "Data successfully updated" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Obtener la dirección de un usuario
  getAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, { include: UserAddress });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const userAddress = await UserAddress.findByPk(id, {
        include: User,
      });
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
