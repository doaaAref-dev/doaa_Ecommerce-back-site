const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const multer = require("multer");
const path = require("path");

// إعداد مكان وتسمية الملفات
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // كل الملفات تروح في مجلد uploads
  },
  filename: (req, file, cb) => {
    // خلي الاسم عبارة عن timestamp + الامتداد الأصلي
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// إضافة كاتيجوري


// جلب الكل
router.get("/", getCategories);

// تحديث
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);


// حذف
router.delete("/:id", deleteCategory);

module.exports = router;
