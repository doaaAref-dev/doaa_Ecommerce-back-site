const Logo = require("../model/logo.model.js");
const path = require("path");
const fs = require("fs");

// ✅ Get current logo
const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    return res.json({ url: logo ? logo.url : null });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logo" });
  }
};

// ✅ Upload new logo
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = `/uploads/${req.file.filename}`;

    // Remove old record
    await Logo.deleteMany({});
    const newLogo = await Logo.create({ url: fileUrl });

    res.json({ url: newLogo.url });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
     console.error("Upload Error:", err);
  }
};

// ✅ Remove logo
const removeLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (logo) {
      const filePath = path.join("uploads/logo", path.basename(logo.url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await Logo.deleteMany({});
    }
    res.json({ message: "Logo removed" });
  } catch (err) {
    res.status(500).json({ error: "Remove failed" });
  }
};

// ✅ Revert to default logo
const revertLogo = async (req, res) => {
  try {
    const defaultUrl = "/default/logo.jpg"; // ثابتة
    await Logo.deleteMany({});
    const newLogo = await Logo.create({ url: defaultUrl });
    res.json({ url: newLogo.url });
  } catch (err) {
    res.status(500).json({ error: "Revert failed" });
  }
};

module.exports = {
  getLogo,
  uploadLogo,
  removeLogo,
  revertLogo,
};
