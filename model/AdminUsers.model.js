// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: true },
    image: { type: String }, // مسار الصورة بعد الرفع
    permissions: {
      addProduct: { type: Boolean, default: false },
      updateProduct: { type: Boolean, default: false },
      deleteProduct: { type: Boolean, default: false },
      applyDiscount: { type: Boolean, default: false },
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminUsers", userSchema);
