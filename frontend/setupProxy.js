import createProxyMiddleware from 'http-proxy-middleware';

module.exports = (app) => {
    app.use(
        createProxyMiddleware({
            target: 'https://k3b103.p.ssafy.io',
            changeOrigin: true,
        })
    );
};