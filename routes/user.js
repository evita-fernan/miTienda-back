const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserAddress = require("../models/UserAddress");
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const checkAuth = require("../middlawares/auth");
const checkRoleAuth = require("../middlawares/roleAuth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.post("/:id/registerAddress", checkAuth, UserController.registerAddress);
router.put("/:id/editAddress", checkAuth, UserController.editAddress);
router.get("/:id/getAddress", checkAuth, UserController.getAddress);
router.get(
  "/getAllAddress",
  checkAuth,
  checkRoleAuth(["admin"]),
  UserController.getAllAddress
);

router.put("/forgotPassword", AuthController.forgotPassword);
router.put("/newPassword", checkAuth, AuthController.newPassword);

router.get(
  "/getAllUsers",
  checkAuth,
  checkRoleAuth(["admin"]),
  UserController.getAllUsers
);
router.get(
  "/getUser/:id",
  checkAuth,
  checkRoleAuth(["admin"]),
  UserController.getUser
);

module.exports = router;
