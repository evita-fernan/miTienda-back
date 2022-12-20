const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
