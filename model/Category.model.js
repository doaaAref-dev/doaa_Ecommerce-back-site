const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: 
      {
        type: String, // رابط الصورة
      },
    
    subCategories: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "active"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
