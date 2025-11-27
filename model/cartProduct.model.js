// cartProduct.model.js
const reviewSchema = require("./reviews"); // <-- مهم جدًا

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [String],
 category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true
},
  colors: [String],
  sizes: [String],
  tags: [String],
  countInStock: { type: Number, default: 0 },
  reviews: [reviewSchema]
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
