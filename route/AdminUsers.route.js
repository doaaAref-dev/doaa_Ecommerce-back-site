// routes/user.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/AdminUsers.controller")

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
router.post("/", upload.single("image"), userController.createUser);
router.get("/", userController.getUsers);
router.put("/:id", upload.single("image"), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
