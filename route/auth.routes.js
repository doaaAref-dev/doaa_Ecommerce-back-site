// routes/auth.routes.js
const router = require('express').Router();

const { protect, admin } = require('../middleware/auth.middleware');

const { register, login ,updateProfile,changePassword } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, (req, res) => {
  res.json(req.user);  // هيرجع بيانات المستخدم اللي عامل لوجين
});
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;
