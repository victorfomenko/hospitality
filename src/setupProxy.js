const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api/**/*', {
      target: 'http://demo-api.sofiapulse.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
    }),
  );
};
