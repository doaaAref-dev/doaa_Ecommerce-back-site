const Blog = require("../model/Blog.model");

// إضافة مدونة
exports.createBlog = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = new Blog({ title, description, status, image });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// الحصول على جميع المدونات
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// تحديث مدونة
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// حذف مدونة
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
