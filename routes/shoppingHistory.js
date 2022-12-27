const express = require("express");
const router = express.Router();
const ShoppingHistoryController = require("../controllers/ShoppingHistoryController");
const authentication = require("../middlewares/authentication");

router.post(
  "/newOrder",
  authentication,
  ShoppingHistoryController.addShoppingHistory
);

module.exports = router;
