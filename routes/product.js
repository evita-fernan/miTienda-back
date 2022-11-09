const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Product = require("../models/Product")
const ProductController = require("../controllers/ProductController")
const checkAuth = require("../middlawares/auth")
const checkRoleAuth = require("../middlawares/roleAuth")

router.post("/addProduct", checkAuth, checkRoleAuth(["admin"]), ProductController.addProduct)
router.put("/editProduct", checkAuth, checkRoleAuth(["admin"]), ProductController.editProduct)
router.delete("/deleteProduct", checkAuth, checkRoleAuth(["admin"]), ProductController.deleteProduct)
router.get("/getAllProducts", checkAuth, ProductController.getAllProducts)
router.get("/getProduct", checkAuth, ProductController.getProduct)

module.exports = router