const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getLogo,
  uploadLogo,
  removeLogo,
  revertLogo,
} = require( "../controllers/logo.controller");


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // حد 5MB
});

// ✅ Routes
router.get("/", getLogo);
router.post("/", upload.single("logo"), uploadLogo);
router.delete("/", removeLogo);
router.post("/revert", revertLogo);

module.exports=router;