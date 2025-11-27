const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);


module.exports = reviewSchema;
