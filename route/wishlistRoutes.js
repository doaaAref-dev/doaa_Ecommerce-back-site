const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} =require("../controllers/wishlistController.js") ;
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get("/", protect, getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/:productId", protect, removeFromWishlist);
router.delete("/", protect, clearWishlist);

module.exports = router;
