const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  console.log("🔹 Incoming Authorization header:", authHeader); // ✅ شوفي الهيدر جاي ولا لأ

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: 'User not found' });
    }

    console.log("🟢 Authenticated user:", req.user._id);
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: 'Token invalid' });
  }
};
exports.verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
