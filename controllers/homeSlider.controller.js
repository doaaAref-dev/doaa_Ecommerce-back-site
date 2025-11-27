const HomeSlide = require("../model/HomeSlider.model");

// ➕ إضافة سلايد
exports.createSlide = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) return res.status(400).json({ message: "Image is required" });

    const slide = new HomeSlide({ image });
    await slide.save();

    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ message: "Error creating slide", error });
  }
};

// 📌 الحصول على جميع السلايدز
exports.getSlides = async (req, res) => {
  try {
    const slides = await HomeSlide.find().sort({ createdAt: -1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: "Error fetching slides", error });
  }
};

// ✏️ تحديث سلايد (تغيير الصورة فقط)
exports.updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const slide = await HomeSlide.findByIdAndUpdate(id, updateData, { new: true });

    if (!slide) return res.status(404).json({ message: "Slide not found" });

    res.json(slide);
  } catch (error) {
    res.status(500).json({ message: "Error updating slide", error });
  }
};

// 🗑️ حذف سلايد
exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HomeSlide.findByIdAndDelete(id);

    if (!slide) return res.status(404).json({ message: "Slide not found" });

    res.json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting slide", error });
  }
};
