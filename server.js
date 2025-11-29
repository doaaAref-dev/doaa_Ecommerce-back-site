const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/connectDB');
const path = require("path");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan('dev'));

app.use("/api/users", require("./route/AdminUsers.route"));
app.use("/api/auth", require("./route/auth.routes"));
app.use("/api/products", require('./route/product.routes'));
app.use("/api/categories", require("./route/Category.route"));
app.use("/api/blogs", require("./route/blogs.route"));
app.use("/api/homeslides", require("./route/homeSlider.route"));
app.use("/api/cart", require("./route/cartRoutes"));
app.use("/api/wishlist", require("./route/wishlistRoutes"));
app.use("/api/orders", require("./route/orderRoutes"));
app.use("/api/logo", require("./route/logo.route"));


app.use(require('./middleware/error.middleware'));

module.exports = app; 
