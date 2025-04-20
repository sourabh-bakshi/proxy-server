const express = require('express');
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');

const app = express();

app.use(cors({
    origin: 'https://connectedapp-frontend.onrender.com',
    credentials: true
}));

app.use('/*', createProxyMiddleware({
    target: 'connectedapp-production.up.railway.app',
    changeOrigin: true,
    secure: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Origin', 'https://connectedapp-frontend.onrender.com');        
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'https://connectedapp-frontend.onrender.com';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Proxy server is running on port', port);
    console.log('Proxying requests to connectedapp-production.up.railway.app');
});