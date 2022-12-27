const { OrderDetail, User, Product } = require("../database/models");

module.exports = {
  addOrder: async (req, res) => {
    try {
      const newOrder = await OrderDetail.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getOrder: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, { raw: true });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const orders = await OrderDetail.findAll({
        where: { userId: userId },
        include: Product,
      });
      return res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
