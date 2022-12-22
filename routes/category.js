const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middlawares/authentication");
const checkRoleAuth = require("../middlawares/roleAuth");

router.post(
  "/addCategory",
  authentication,
  checkRoleAuth(["admin"]),
  CategoryController.addCategory
);
router.put(
  "/editCategory",
  authentication,
  checkRoleAuth(["admin"]),
  CategoryController.editCategory
);

router.get("/getCategories", authentication, CategoryController.getCategories);
router.get("/getCategory", authentication, CategoryController.getCategory);
router.get(
  "/getProductsByCategory/:categoryId",
  authentication,
  CategoryController.getProductsByCategory
);

module.exports = router;
