const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const paymentRouter = require("./userPayment");
const orderRouter = require("./orderDetail");
const shoppingCartRouter = require("./shoppingCart");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/userPayment", paymentRouter);
router.use("/orderDetail", orderRouter);
router.use("/shoppingCart", shoppingCartRouter);

module.exports = router;
