const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const checkRoleAuth = require("../middlewares/roleAuth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post(
  "/:id/registerAddress",
  authentication,
  UserController.registerAddress
);
router.put("/:id/editAddress", authentication, UserController.editAddress);
router.get("/:id/getAddress", authentication, UserController.getAddress);

router.put("/forgotPassword", AuthController.forgotPassword);
router.put("/newPassword", authentication, AuthController.newPassword);

router.get(
  "/getAllUsers",
  authentication,
  checkRoleAuth(["admin"]),
  UserController.getAllUsers
);
router.get(
  "/getUser/:id",
  authentication,
  checkRoleAuth(["admin"]),
  UserController.getUser
);

module.exports = router;
