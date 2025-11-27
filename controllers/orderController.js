const Order = require("../model/Order");

// 🟢 إنشاء أوردر جديد
const createOrder = async (req, res) => {
  try {
    const { items, totalQty, totalPrice } = req.body;
    const userId = req.user.id; // جاية من التوكن بعد الـ middleware
console.log("🟢 Authenticated user:", req.user._id);

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId,
      items,
      totalQty,
      totalPrice,
      status: "pending",
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 عرض كل الطلبات لمستخدم محدد
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 (اختياري) عرض كل الطلبات للأدمن
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate({
        path: "items.productId",
        select: "name category images price",
        populate: {
          path: "category", // ده الحقل اللي جوه الـ Product
          select: "name",   // الحقول اللي محتاجاها من الـ Category
        },
      });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// تحديث حالة الطلب
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Error updating status", error: err });
  }
};

module.exports = {
  updateOrderStatus,
};



// ✅ تصدير الدوال
module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
