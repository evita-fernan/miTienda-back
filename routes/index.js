const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const productRouter = require("./product");
const ProductCategoryRouter = require("./productCategory")

router.use("/user", userRouter);
router.use("/product", productRouter)
router.use("/productCategory", ProductCategoryRouter)


module.exports = router;
