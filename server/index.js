const express = require('express')
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors());
const path = require("path");
const ext = require('./helpers/Ext');



// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use('/api', createProxyMiddleware({ 
//     target: 'http://localhost:3000/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));

// app.use('/', createProxyMiddleware({ 
//   target: 'http://localhost:3000/', //original url
//   changeOrigin: true, 
//   //secure: false,
//   onProxyRes: function (proxyRes, req, res) {
//      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }));


app.use(express.static(path.join(__dirname.replace('server', ''), 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname.replace('server', ''), '/client/build/index.html'));
});

app.use('/api', ext);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname.replace('server', ''), '/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})