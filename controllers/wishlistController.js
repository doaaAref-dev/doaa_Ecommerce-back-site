const User = require("../model/user.model");

 const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id })
      .populate("product", "name price images"); 
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const addToWishlist = async (req, res) => {
  try {
     const productId = req.body.productId || req.body._id;
    

    const user = await User.findById(req.user._id).populate("cart.product");

    const exists = user.wishlist.find((item) => item.product.toString() === productId);
    if (!exists) {
      user.wishlist.push({ product: productId });
      await user.save();
    }

    const updatedUser = await user.populate("wishlist.product");
    res.json(updatedUser.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();
    const updatedUser = await user.populate("wishlist.product");
    res.json(updatedUser.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = [];
    await user.save();
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: "Failed to clear wishlist" });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
