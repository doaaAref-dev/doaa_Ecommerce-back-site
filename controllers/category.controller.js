const Category = require("../model/Category.model");

// =====================
// إنشاء كاتيجوري جديد
// =====================
exports.createCategory = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { name, subCategories, status } = req.body;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const category = await Category.create({
      name,
      image,
      subCategories: subCategories ? JSON.parse(subCategories) : [],
      status: status || "active",
    });

    res.status(201).json(category);
  } catch (err) {
    console.error("Error in createCategory:", err);
    res.status(500).json({ message: err.message });
  }
};

// =====================
// تحديث كاتيجوري
// =====================
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subCategories, status } = req.body;

    // جيب الكاتيجوري الأول
    const oldCategory = await Category.findById(id);
    if (!oldCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // جهز البيانات للتحديث
    const updateData = {
      name: name ?? oldCategory.name,
      subCategories: subCategories
        ? JSON.parse(subCategories)
        : oldCategory.subCategories,
      status: status ?? oldCategory.status,
    };

    // لو فيه صورة جديدة نضيفها
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    } else {
      updateData.image = oldCategory.image;
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(category);
  } catch (err) {
    console.error("Error in updateCategory:", err);
    res.status(500).json({ message: err.message });
  }
};

// =====================
// حذف كاتيجوري
// =====================
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error in deleteCategory:", err);
    res.status(500).json({ message: err.message });
  }
};

// =====================
// جلب كل الكاتيجوريز
// =====================
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error("Error in getCategories:", err);
    res.status(500).json({ message: err.message });
  }
};

// =====================
// جلب كاتيجوري واحد
// =====================
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error in getCategoryById:", err);
    res.status(500).json({ message: err.message });
  }
};
