const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
   getProductsByCategory,
    getLatestProducts,
    getProductsBySearch,
    AddReview,
    getProductsBySubCategory,
    fetchReviews

} = require("../controllers/product.controller");

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

// Routes


router.get("/get", getProducts);
router.get("/latest", getLatestProducts); 
router.get("/search", getProductsBySearch);
router.get("/reviews/:productId",fetchReviews);
router.post("/reviews/:productId", AddReview);

router.get("/category/:id", getProductsByCategory);
router.get("/subcategory/:subName", getProductsBySubCategory);

// Dynamic GET route
router.get("/:id", getProductById);

// CRUD routes
router.post("/create", upload.array("images", 5), createProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
