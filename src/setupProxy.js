const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/vote",
    createProxyMiddleware({
      target: `http://localhost`,
      headers: {
        accept: "application/json",
      },
      changeOrigin: true,
    })
  );
};
