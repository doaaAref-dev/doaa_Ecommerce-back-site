const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const homeSlideController = require("../controllers/homeSlider.controller");

// إعداد رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// الراوتات
router.post("/", upload.single("image"), homeSlideController.createSlide);
router.get("/", homeSlideController.getSlides);
router.put("/:id", upload.single("image"), homeSlideController.updateSlide);
router.delete("/:id", homeSlideController.deleteSlide);

module.exports = router;
