const express = require("express");
const {
  getCart,
  addToCart,
  updateCartQty,
  removeFromCart,
  clearCart,
}=require( "../controllers/cartController.js") ;
const { protect, admin } = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/", protect, updateCartQty);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);

module.exports = router;
