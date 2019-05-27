const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api/*', {
      target: 'http://demo-bo.sofiapulse.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
    }),
  );
};
