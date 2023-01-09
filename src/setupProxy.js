const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    // axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E6%B7%B1%E5%9C%B3&ci=30&channelId=4').then(res => console.log(res.data))
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://i.maoyan.com',
            changeOrigin: true
        })
    )
}
