const express = require("express")
const router = express.Router()
const User = require("../models/User")
const UserPayment = require("../models/UserPayment")
const checkAuth = require("../middlawares/auth")


module.exports = router
