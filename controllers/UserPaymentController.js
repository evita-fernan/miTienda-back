const { User } = require("../database/models");
const { UserPayment } = require("../database/models");
require("dotenv").config();

module.exports = {
  addPayment: async (req, res) => {
    const userId = req.params.id;
    const { paymentType, provider, accountNumber, expiry } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const payment = await UserPayment.create(
        { paymentType, provider, accountNumber, expiry, userId },
        { include: User }
      );
      res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  editPayment: async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await UserPayment.findByPk(id);
      if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
      }
      await UserPayment.update(req.body, { where: { id: id } });
      res.status(200).json({ msg: "Payment successfully edited" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getPayment: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const payment = await UserPayment.findAll({
        where: { userId },
        raw: true,
      });
      res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deletePayment: async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await UserPayment.findByPk(id);
      if (!payment) {
        return res.status(404).json({ msg: "Payment not found" });
      }
      await payment.destroy({ where: { id } });
      res.status(200).json({ msg: "Payment successfully removed" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  },
};
