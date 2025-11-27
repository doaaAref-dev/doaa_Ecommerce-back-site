// server.js - Vercel serverless entry
const serverless = require('serverless-http');
const app = require('./index');

// Export the serverless handler for Vercel (@vercel/node)
module.exports = serverless(app);


