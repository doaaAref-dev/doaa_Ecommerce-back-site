// controllers/auth.controller.js
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcryptjs =require("bcryptjs")

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
exports.register = async (req, res, next) => {
  try {
    const { name, email, password ,confirmPassword} = req.body;
 if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // تحقق من الباسوورد
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ name, email, password });
    const token = createToken(user);

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) { 
    console.log(err);
    
    next(err); 
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    console.log(req.body); // يوضح البيانات اللي جاية من الريأكت
console.log(user);
  } catch (err) { next(err); }
};
exports.profile = async (req, res, next) => {
  try {
    // هنا هتجيبي الـ userId من الـ middleware (اللي بيفك التوكن)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
      user.password = req.body.password; // هيتهندل في الـ pre('save') بالهاش
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تغيير كلمة السر
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // التحقق من الباسورد القديم
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمة السر القديمة غير صحيحة" });
    }

    user.password = newPassword; // هيتهندل بالـ pre('save') اللي بيعمل hash
    await user.save();

    res.json({ message: "✅ تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

