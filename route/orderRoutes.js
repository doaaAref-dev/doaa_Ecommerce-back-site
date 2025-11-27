const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders,updateOrderStatus } = require("../controllers/orderController");
const { protect ,verifyAdmin} = require("../middleware/auth.middleware");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);
router.get("/all_order", protect, getAllOrders);
router.patch("/:id/status", protect, verifyAdmin, updateOrderStatus);

module.exports = router;
