const mongoose = require("mongoose");

const homeSlideSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // الصورة فقط
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeSlide", homeSlideSchema);
