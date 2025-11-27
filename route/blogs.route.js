const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const blogController = require("../controllers/blogs.controller");

// إعداد رفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// الراوتات
router.post("/", upload.single("image"), blogController.createBlog);
router.get("/", blogController.getBlogs);
router.put("/:id", upload.single("image"), blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
