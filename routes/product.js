const express = require("express")
const router = express.Router()
const ProductController = require("../controllers/ProductController")
const authentication = require("../middlawares/authentication")
const checkRoleAuth = require("../middlawares/roleAuth")

router.post("/addProduct", authentication, checkRoleAuth(["admin"]), ProductController.addProduct)
router.put("/editProduct", authentication, checkRoleAuth(["admin"]), ProductController.editProduct)
router.delete("/deleteProduct", authentication, checkRoleAuth(["admin"]), ProductController.deleteProduct)
router.get("/getAllProducts", authentication, ProductController.getAllProducts)
router.get("/getProduct", authentication, ProductController.getProduct)

module.exports = router