const express = require("express");
const router = express.Router();
const ShoppingCartController = require("../controllers/ShoppingCartController");
const authentication = require("../middlewares/authentication");

router.post("/add", authentication, ShoppingCartController.addToShoppingCart);
router.get("/:userId", authentication, ShoppingCartController.getShoppingCart);
router.delete(
  "/delete",
  authentication,
  ShoppingCartController.deleteShoppingCart
);
router.put(
  "/edit/:shoppingCartId",
  authentication,
  ShoppingCartController.editShoppingCart
);

module.exports = router;
