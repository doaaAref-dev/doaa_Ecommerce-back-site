const Product = require("../model/cartProduct.model");

const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string" && val.includes(",")) {
    return val.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [val];
};

// @desc    Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLatestProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit);

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log("✅ Found latest products:", products.length);

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error fetching latest products:", error);
    res.status(500).json({
      
      message: "Error fetching latest products",
      error: error.message,
      stack: error.stack,
    });
  }
};
// @desc    Create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      discount,
      category,
      Quantity,
      countInStock,
    } = req.body;

    const colors = toArray(req.body.colors);
    const sizes = toArray(req.body.sizes);
    const tags = toArray(req.body.tags);

    // هترجع لينكات الصور
   const images = req.files
  ? req.files.map((f) => `${req.protocol}://${req.get("host")}/uploads/${f.filename}`)
  : [];


    const product = new Product({
      name,
      brand,
      description,
      price: price ? Number(price) : 0,
      discount: discount ? Number(discount) : 0,
      Quantity:Quantity?Number(Quantity) : 0,
       category: req.body.categoryId, 
      images,
      colors,
      sizes,
      tags,

      countInStock: countInStock ? Number(countInStock) : 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};
// Get products by category ID
const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // هل القيمة ObjectId ؟
    const isObjectId = id.length === 24;

    let products;

    if (isObjectId) {
      // لو ID → فلترة حسب الكاتيجوري
      products = await Product.find({ category: id });
    } else {
      // لو String → فلترة حسب subCategory
      products = await Product.find({ subCategory: id });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsBySubCategory = async (req, res) => {
  try {
    const { name } = req.params;

    const products = await Product.find({ subCategory: name });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
const getProductById = async (req, res) => {
  
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsBySearch = async (req, res) => {
 try {
    const { search, category, subCategory } = req.query;

    let filter = {};

    if (search && typeof search === "string") {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: safeSearch, $options: "i" };
    }

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const products = await Product.find(filter).lean();
    res.json(products);
  } catch (err) {
    console.error("❌ Error in getProductsBySearch:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  }
};
// @desc    Update product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      discount,
      category,
      countInStock,
    } = req.body;

    const colors = toArray(req.body.colors);
    const sizes = toArray(req.body.sizes);
    const tags = toArray(req.body.tags);
    const images = req.files
      ? req.files.map((f) => f.path.replace(/\\/g, "/"))
      : [];

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name ?? product.name;
    product.brand = brand ?? product.brand;
    product.description = description ?? product.description;
    product.price = price ? Number(price) : product.price;
    product.discount = discount ? Number(discount) : product.discount;
    product.category = category ?? product.category;
    product.countInStock = countInStock
      ? Number(countInStock)
      : product.countInStock;

    if (req.body.colors) product.colors = colors;
    if (req.body.sizes) product.sizes = sizes;
    if (req.body.tags) product.tags = tags;
    if (images.length > 0) product.images = images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne(); // ✅ بدل remove()
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};

const AddReview = async (req, res) => {
  try {
    const { userId, userName, rating, comment, date } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $push: {
          reviews: { userId, userName, rating, comment, date }
        }
      },
      { new: true }
    );

    res.json(updated.reviews);  // يفضل إعادة الريفيوهات فقط
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchReviews= async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product.reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
   getProductsByCategory,
   getLatestProducts,getProductsBySearch,
   AddReview,
   fetchReviews,
   getProductsBySubCategory

};
