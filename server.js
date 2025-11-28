// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/connectDB');
const path = require("path");
const userRoutes = require("./route/AdminUsers.route");
const logoRoutes = require("./route/logo.route");
const authRoutes = require("./route/auth.routes");
const orderRoutes = require("./route/orderRoutes");
const cartRoutes = require("./route/cartRoutes");
import serverless from "serverless-http";
dotenv.config();
const app = express();

// connect to DB
connectDB();

app.use(cors());
app.use("/default", express.static("default"));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// allowed origins


// middlewares
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));




app.use(morgan('dev'));

// routes
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', require('./route/product.routes'));
app.use("/api/categories", require("./route/Category.route"));
app.use("/api/blogs", require("./route/blogs.route"));
app.use("/api/homeslides", require("./route/homeSlider.route"));
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", require("./route/wishlistRoutes"));
app.use("/api/orders", orderRoutes);
app.use("/api/logo", logoRoutes);
// static uploads (مهم ييجي قبل error middleware)


// error handler
app.use(require('./middleware/error.middleware'));

// Local development server (only runs when executed directly, not when required by Vercel)
const serverless = require("serverless-http");

module.exports.handler = serverless(app);

