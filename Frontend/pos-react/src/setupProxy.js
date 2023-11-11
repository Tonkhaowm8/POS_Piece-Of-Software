const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy API requests to your Node.js backend
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://xyql0fuf33.execute-api.us-east-1.amazonaws.com/alphamale/', // Ensure this matches your backend address
      // target: 'http://localhost:4000/', // Ensure this matches your backend address
      changeOrigin: true,
    })
  );
};
