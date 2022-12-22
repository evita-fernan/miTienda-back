const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/UserPaymentController");
const authentication = require("../middlawares/authentication");

router.post("/addPayment/:id", authentication, PaymentController.addPayment);
router.put("/editPayment/:id", authentication, PaymentController.editPayment);
router.get("/getPayment/:id", authentication, PaymentController.getPayment);
router.delete("/deletePayment/:id", authentication, PaymentController.deletePayment);
module.exports = router;
