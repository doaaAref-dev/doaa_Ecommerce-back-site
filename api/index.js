const serverless = require("serverless-http");
const app = require("../server"); // استدعاء Express app
module.exports.handler = serverless(app);
