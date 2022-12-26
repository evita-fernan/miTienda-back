const { ShoppingCart, Product, User } = require("../database/models");
require("dotenv").config();

module.exports = {
  addToShoppingCart: async (req, res) => {
    try {
      const newShoppingCart = await ShoppingCart.create(req.body);
      res.status(201).json(newShoppingCart);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getShoppingCart: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const allShoppingCart = await ShoppingCart.findAll({
        where: { userId },
        include: Product,
      });
      res.status(200).json(allShoppingCart);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  deleteShoppingCart: async (req, res) => {
    try {
      await ShoppingCart.destroy({ where: { id: req.body.shoppingCartId } });
      res.status(200).json({ msg: "Product successfully removed" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  editShoppingCart: async (req, res) => {
    try {
      const edited = await ShoppingCart.update(
        { quantity: req.body.quantity },
        {
          where: { id: req.params.shoppingCartId },
        }
      );
      res.status(200).json({msg: "Shopping Cart edited"});
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
