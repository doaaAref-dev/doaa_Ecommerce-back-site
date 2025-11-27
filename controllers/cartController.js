const User = require("../model/user.model");
const Product = require("../model/cartProduct.model");

// 🟢 جلب محتوى الكارت
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 🟢 إضافة منتج إلى الكارت
const addToCart = async (req, res) => {
  try {
    console.log("🧠 addToCart called");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    const productId = req.body.productId || req.body._id;
    const qty = req.body.qty || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id).populate("cart.product");

    const exist = user.cart.find(
      (item) => item.product._id.toString() === productId
    );

    if (exist) {
      exist.qty += qty;
    } else {
      user.cart.push({ product: productId, qty });
    }

    await user.save();
    const updatedUser = await user.populate("cart.product");
    res.json(updatedUser.cart);
  } catch (err) {
    console.error("❌ Error in addToCart:", err);
    res.status(500).json({ message: err.message });
  }
};


// 🔴 تحديث الكمية (اختياري)
const updateCartQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (item) {
      item.qty = qty;
      await user.save();
    }

    const updatedUser = await user.populate("cart.product");
    res.json(updatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity" });
  }
};

// 🔴 حذف منتج من الكارت
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    const updatedUser = await user.populate("cart.product");
    res.json(updatedUser.cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from cart" });
  }
};

// 🔴 مسح الكارت بالكامل
const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQty,
  removeFromCart,
  clearCart,
};
