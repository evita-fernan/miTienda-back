const {
  ShoppingHistory,
  OrderDetail,
  ShoppingCart,
  User,
} = require("../database/models");

module.exports = {
  addShoppingHistory: async (req, res) => {
    const algo = req.body.detail;
    console.log(algo);
    let detail = req.body.detail.map((oneProduct) => {
      return {
        productName: oneProduct.productName,
        quantity: oneProduct.quantity,
        price: oneProduct.price,
        userId: oneProduct.userId,
        productId: oneProduct.productId,
      };
    });
    console.log("\n\n PASO N1 \n\n");
    console.log("SOY DETAIL", detail);
    let order = {
      finalPrice: req.body.finalPrice,
      userId: req.body.userId,
      userAddressId: req.body.userAddressId,
      userPaymentId: req.body.userPaymentId,
      orderDetailId: req.body.orderDetailId,
    };
    console.log("\n\n PASO N2 \n\n");
    console.log("SOY ORDER", order);
    try {
      const newHistory = await ShoppingHistory.create(order, { raw: true });
      await detail.forEach((element) => {
        element.shoppingHistoryId = newHistory.id;
      });
      console.log("\n\n PASO N3 \n\n");
      console.log("SOY NEW HISTORY", newHistory);
      try {
        const newOrder = await OrderDetail.bulkCreate(detail,  { raw: true });
        console.log("\n\n PASO N4 \n\n");
        console.log("SOY NEW ORDER", newOrder);
        try {
          await ShoppingCart.destroy({ where: { userId: order.userId } });
          res.status(200).json({ msg: "Shopping cart deleted" });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  //bulkCreate es para insertar varias filas en un método
  getShoppingHistory: async (req, res) => {},

  deleteShoppingHistory: async (req, res) => {},

  editShoppingHistory: async (req, res) => {},
};