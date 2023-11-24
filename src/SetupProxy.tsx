import { Express } from 'express'; // Import the Express type

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: Express) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    })
  );
};