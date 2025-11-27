// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: { type: Number, default: 1 },
});

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});



const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
   cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],

}, { timestamps: true });

// hash password قبل الحفظ
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// method للمقارنة
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
