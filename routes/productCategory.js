const express = require("express")
const router = express.Router()
const User = require("../models/User")
const ProductCategory = require("../models/ProductCategory")
const ProductCategoryController = require("../controllers/ProductCategoryController")
const checkAuth = require("../middlawares/auth")
const checkRoleAuth = require("../middlawares/roleAuth")

router.post("/addCategory", checkAuth, checkRoleAuth(["admin"]), ProductCategoryController.addCategory)
router.put("/editCategory", checkAuth, checkRoleAuth(["admin"]), ProductCategoryController.editCategory)
router.delete("/deleteCategory", checkAuth, checkRoleAuth(["admin"]), ProductCategoryController.deleteCategory)
router.get("/getCategories", checkAuth, ProductCategoryController.getCategories)
router.get("/getCategory", checkAuth, ProductCategoryController.getCategory)
router.get("/getProductsByCategory/:categoryId", checkAuth, ProductCategoryController.getProductsByCategory)


module.exports = router