const express = require("express");
const router = express.Router();
const OrderDetailController = require("../controllers/OrderDetailController");
const authentication = require("../middlewares/authentication");

router.post("/newOrder", authentication, OrderDetailController.addOrder);
router.get("/:userId", authentication, OrderDetailController.getOrder);

module.exports = router;
