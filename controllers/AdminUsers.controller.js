// controllers/user.controller.js
const User = require("../model/AdminUsers.model");
const bcrypt =require("bcryptjs")

// إنشاء مستخدم جديد
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, permissions, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image,
      permissions,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// جلب كل المستخدمين
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    console.log(users);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تحديث مستخدم
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// حذف مستخدم
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
