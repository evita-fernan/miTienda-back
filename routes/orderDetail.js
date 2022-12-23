const express = require("express")
const router = express.Router()
const OrderDetailController = require("../controllers/OrderDetailController")
const authentication = require("../middlawares/authentication")
const checkRoleAuth = require("../middlawares/roleAuth")

module.exports = router
